import { Link } from 'react-router-dom'
export default function StatePanel({ title, detail, action, to }: { title: string; detail: string; action?: string; to?: string }) { return <div className="state-panel" role="status"><h2>{title}</h2><p>{detail}</p>{action && to && <Link className="button button-outline" to={to}>{action}</Link>}</div> }
