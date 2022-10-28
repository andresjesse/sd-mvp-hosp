import { Button } from 'antd'
import styles from './styles.module.css'

interface ComponentProps {
  title: string
  width?: number
}

/** width in pixels */
export default function AppButton({ title, width = 200 }: ComponentProps) {
  return (
    <Button style={{ width }} className={styles.button}>
      {title}
    </Button>
  )
}
