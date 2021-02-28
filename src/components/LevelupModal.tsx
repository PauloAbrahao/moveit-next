import { useContext } from 'react'
import { challengeContext } from '../contexts/Challengecontext'
import style from '../style/components/LevelupModal.module.css'

export function LevelupModal() {
    const { level, closeLevelUp } = useContext(challengeContext);

    return (
        <div className={ style.overlay}>
            <div className={style.container}> 
                <header>{level}</header>

                <strong>Parabéns</strong>

                <p>Você alcançou um novo level!</p>

                <button type="button" onClick={closeLevelUp}>
                    <img src="/icons/close.svg" alt=""/>
                </button>
            </div>
        </div>
     
    )
}