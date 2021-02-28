import { useContext } from 'react';

import { challengeContext } from '../contexts/Challengecontext';
import style from '../style/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(challengeContext)

    const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel); 

    return (
        <header className={style.experienceBar}>
            <span>0 xp</span>
            <div> 
                <div style={{ width: `${percentToNextLevel}%` }} />

                <span className={style.currentExperience} style={{left: `${percentToNextLevel }%`}}> {currentExperience} xp</span>
                
            </div>
            <span> {experienceToNextLevel} xp </span>
        </header>
    );
} 