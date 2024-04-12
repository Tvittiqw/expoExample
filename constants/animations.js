import {ReduceMotion} from 'react-native-reanimated'

export const springConfig = {
    mass: 1,
    damping: 14,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
    reduceMotion: ReduceMotion.System,
};