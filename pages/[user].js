import styles from '../styles/User.module.css'
import Image from 'next/image'
import fs from 'fs'
import Link from 'next/link'

export async function getStaticPaths() {
  const files = listFiles()
  console.log('files:', files)

  const paths = files.map(file => {
    return {
      params: { user: file.split(".")[0]}
    }
  })

  console.log('paths:', paths)

  return {
    paths,
    fallback: false
  }
  
  function listFiles() {
    const files = fs.readdirSync("database")
    return files
  }
}

export async function getStaticProps(context) {
  const { user } = context.params 

  const userInfo = fs.readFileSync(`database/${user}.json`)
  console.log('userInfo:', JSON.parse(userInfo)) 

  return {
    props: {user: JSON.parse(userInfo)}
  }
}

export default function User({user}) {

  return (
    <div className={styles.card}>
      <Link href="/">Home</Link>
      <div className={styles.user_info}>
        <Image
          className={styles.card_image}
          src={`${user.github}.png`}
          width={150} height={150}
          alt={user.name}
        />
        <h2>{user.name}</h2>
        <p>{`${user.city} - ${user.state}`}</p>
      </div>

      <div className={styles.links}>
        {user.email &&
          <div className={styles.link}>
            <p>Email</p>
            <a href={`mailto:${user.email}`} target="_blank">{user.email}</a>
          </div>}

        {user.github &&
          <div className={styles.link}>
            <p>Github</p>
            <a href={user.github} target="_blank">{user.github}</a>
          </div>}

        {user.linkedin_url &&
          <div className={styles.link}>
            <p>Linkedin</p>
            <a href={user.linkedin_url} target="_blank">{user.linkedin_url}</a>
          </div>}

        {user.rocketseat_profile &&
          <div className={styles.link}>
            <p>Rocketseat</p>
            <a href={user.rocketseat_profile} target="_blank">{user.rocketseat_profile}</a>
          </div>}

      </div>

    </div>
  )

}