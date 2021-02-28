import { useContext } from 'react';

import { challengeContext } from '../contexts/Challengecontext';
import { CountdownContext } from '../contexts/CountdownContext';
import style from '../style/components/ChallengeBox.module.css'
import { CompletedChallenges } from './CompletedChallenges';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, CompletedChallenge } = useContext(challengeContext)
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        CompletedChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={style.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={style.challengeActive}>
                    <header> Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="" />
                        <strong>Novo desafio</strong>
                        <p> {activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type='button' className={style.challengeFailedButton}
                        onClick={handleChallengeFailed}
                        > Falhei </button>

                        <button type='button' className={style.challengeSucceededButton} onClick={handleChallengeSucceeded}> Completei </button>
                    </footer>
                </div>
            ) : (
                <div className={style.challengeNotActive}>
                    <strong>
                        Finalize um ciclo para receber um desafio
                    </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios
                    </p>
                </div>
            )}
        </div>
    )
}