import os
import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent


def database_path() -> Path:
    configured_path = os.environ.get("CLONE_WARS_DB_PATH")
    if configured_path:
        return Path(configured_path)
    if os.environ.get("VERCEL"):
        return Path("/tmp/clone_wars_quotes.db")
    return BASE_DIR / "clone_wars_quotes.db"


def create_database() -> str:
    db_path = database_path()
    db_path.parent.mkdir(parents=True, exist_ok=True)

    if db_path.exists():
        try:
            with sqlite3.connect(db_path) as connection:
                row = connection.execute(
                    "SELECT COUNT(*) FROM CLONE_WARS_QUOTES"
                ).fetchone()
            if row and row[0] > 0:
                return str(db_path)
        except sqlite3.Error:
            pass
        db_path.unlink(missing_ok=True)

    schema_path = BASE_DIR / "sql_files" / "create_tables.sql"
    language_dir = BASE_DIR / "sql_files" / "languages"

    with sqlite3.connect(db_path) as connection:
        connection.executescript(schema_path.read_text(encoding="utf-8"))
        for sql_path in sorted(language_dir.glob("*.sql")):
            connection.executescript(sql_path.read_text(encoding="utf-8"))

    return str(db_path)


if __name__ == "__main__":
    created_path = create_database()
    print(f"Database is ready at '{created_path}'.")
