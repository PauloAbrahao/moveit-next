import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import style from '../style/pages/Home.module.css';
import { ChallengeProvider } from '../contexts/Challengecontext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props) {
  return (
    <ChallengeProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={style.conteiner}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>  
    </ChallengeProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level || 1),
      currentExperience: Number(currentExperience || 0),
      challengesCompleted: Number(challengesCompleted || 0),
    }
  }
}