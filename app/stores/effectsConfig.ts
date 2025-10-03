import { defineStore } from 'pinia';

export interface EffectsConfigState {
    magneticStrength: number;
    magneticEnabled: boolean;
    depthEnabled: boolean;
    particlesEnabled: boolean;
    gsapCounters: boolean;
    autoPerformance: boolean;
    minFps: number;
    performanceReduced: boolean;
}

export const useEffectsConfig = defineStore('effectsConfig', {
    state: (): EffectsConfigState => ({
        magneticStrength: 1,
        magneticEnabled: true,
        depthEnabled: true,
        particlesEnabled: true,
        gsapCounters: true,
        autoPerformance: true,
        minFps: 38,
        performanceReduced: false
    }),
    actions: {
        setMagneticStrength(v: number) {
            this.magneticStrength = v;
        },
        toggleMagnetic(v?: boolean) {
            this.magneticEnabled =
                typeof v === 'boolean' ? v : !this.magneticEnabled;
        },
        toggleDepth(v?: boolean) {
            this.depthEnabled = typeof v === 'boolean' ? v : !this.depthEnabled;
        },
        toggleParticles(v?: boolean) {
            this.particlesEnabled =
                typeof v === 'boolean' ? v : !this.particlesEnabled;
        },
        setMinFps(v: number) {
            this.minFps = v;
        },
        markPerformanceReduced() {
            this.performanceReduced = true;
            this.depthEnabled = false;
            this.particlesEnabled = false;
        },
        resetPerformance() {
            this.performanceReduced = false;
        }
    }
});
