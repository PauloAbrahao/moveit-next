import { useContext } from 'react';
import { challengeContext } from '../contexts/Challengecontext';
import style from '../style/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(challengeContext);

    return (
        <div className={style.profileConteiner}>
            <img src="https://github.com/PauloAbrahao.png" alt="Paulo Abrahão"/> 
            <div>
                <strong>Paulo Abrahão</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level { level } 
                </p>
            </div>
        </div>

    );
}