import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie';

import challenges from '../../challenges.json'
import { CompletedChallenges } from '../components/CompletedChallenges';
import { LevelupModal } from '../components/LevelupModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;  
}

interface ChallengeContextData {
    level: number;
    levelUp: () => void;
    currentExperience: number ;
    challengesCompleted: number;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    CompletedChallenge: () => void;
    closeLevelUp: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const challengeContext = createContext({} as ChallengeContextData)

export function ChallengeProvider({ children, ...rest}: ChallengeProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelupModalOpen, setisLevelupModalOpen] = useState(false);


    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
      setLevel(level + 1);
      setisLevelupModalOpen(true);
    }

    function closeLevelUp() {
        setisLevelupModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio! 🎉', {
                body: `Valendo ${challenge.amount}xp!` 
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function CompletedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }
 
    return (
        <challengeContext.Provider 
            value={{
                level, 
                levelUp,
                currentExperience, 
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                CompletedChallenge,
                closeLevelUp
                }}
                >
                { children }
            
            {isLevelupModalOpen && <LevelupModal />}
        </challengeContext.Provider>
    )
}