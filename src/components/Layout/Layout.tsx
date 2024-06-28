import { Layout } from 'antd'
import styles from './layout.module.css'
import { FC, PropsWithChildren } from 'react'

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
        <div className={styles.container}>{children}</div>
    </Layout>
  )
}
