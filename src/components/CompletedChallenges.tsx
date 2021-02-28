import { useContext } from 'react';
import { challengeContext } from '../contexts/Challengecontext';
import style from '../style/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(challengeContext)

    return (
        <div className={style.completedChallengesConteiner}>
            <span>Desafios completos</span>
            <span> { challengesCompleted } </span>
        </div>
    );
}