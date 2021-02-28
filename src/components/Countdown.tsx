import { useState, useEffect, useContext } from 'react';
import { challengeContext } from '../contexts/Challengecontext';
import { CountdownContext } from '../contexts/CountdownContext';
import style from '../style/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { minutes,
        seconds,
        hasFinished, 
        isActive, 
        startCountDown, 
        resetCountdown 
    } = useContext(CountdownContext)


    const [minuteLeft, minuteRight]= String(minutes).padStart(2 ,'0').split(''); //padStart = se o valor gerado não tiver 2 algorismos ele preenche o lado esquerdo do algarismo com zero
    const [secondLeft, secondRight]= String(seconds).padStart(2 ,'0').split('');

   
    return (
        <div>
            <div className={style.countdownConteiner}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

        { hasFinished ? (
            <button
                disabled
                className={style.countdownButton}
                >
                Ciclo encerrado
            </button>
        ) : (
            <>
                { isActive ? (
                    <button
                        type="button"
                        className={`${style.countdownButton} ${style.countdownButtonActive}`}
                        onClick={resetCountdown}
                        >
                        Abandonar ciclo
                    </button>
                ) : (
                    <button
                        type="button"
                        className={style.countdownButton}
                        onClick={startCountDown}
                        >
                        Iniciar ciclo
                    </button>
                ) }
            </>
        )}

        </div>
    );
}