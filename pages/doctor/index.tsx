import { Card } from 'antd'
import Link from 'next/link'

export default function Doctor() {
  return (
    <Card title="Visualizar Interesses">
      <Link href="/doctor/interest">Acesso ao calendário de interesses</Link>
    </Card>
  )
}
