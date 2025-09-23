// Test the countdown calculation for Maha Kumbh Mela 2037
function calculateTimeUntil(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const timeDiff = target - now;
    
    if (timeDiff <= 0) {
        return { expired: true, message: "Event has passed" };
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
        expired: false,
        days: days,
        hours: hours,
        minutes: minutes,
        message: `${days} days, ${hours} hours, ${minutes} minutes`
    };
}

console.log('Current date:', new Date());
console.log('Target date: 2037-01-15');
console.log('Maha Kumbh Mela countdown:', calculateTimeUntil('2037-01-15'));
console.log('Should be around 4,100+ days from now');