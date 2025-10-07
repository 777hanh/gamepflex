// Countdown timer replicate (#days,#hours,#minutes,#seconds)
export default defineNuxtPlugin(() => {
    if (typeof window === 'undefined') return;
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    const setDate = '12/31/';
    const now = new Date();
    const endingDate = new Date(`${setDate}${now.getFullYear() + 1}`).getTime();
    const tick = () => {
        const distance = endingDate - Date.now();
        const days = document.getElementById('days');
        const hours = document.getElementById('hours');
        const minutes = document.getElementById('minutes');
        const seconds = document.getElementById('seconds');
        if (days && hours && minutes && seconds) {
            days.textContent = String(Math.floor(distance / day));
            hours.textContent = String(Math.floor((distance % day) / hour));
            minutes.textContent = String(
                Math.floor((distance % hour) / minute)
            );
            seconds.textContent = String(
                Math.floor((distance % minute) / second)
            );
        }
        if (distance < 0) return; // stop silently
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
});
