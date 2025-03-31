import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); 
};

export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split(" ");
    let intials = "";
    
    for (let i = 0; i<Math.min(words.length, 2); i++) {
        intials += words[i][0];
    }
    return intials.toUpperCase();
    };

export const addThousandsSeperator = (num) => {
        if (num == null || isNaN(num)) return "";
        
        const [integerPart, fractionalPart] = num.toString().split(".");
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        return fractionalPart
            ? `${formattedInteger}.${fractionalPart}`
            : formattedInteger;
    };

export const prepareExpenseBarChartData = (data = []) => {
        const chartData = data.map(item => ({
            category: item.category,
            amount: item.amount,
        }));
        return chartData;
};
export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map(item => ({
        month: moment(item?.date).format('DD MMM'),
        amount: item?.amount || 0, 
        source: item?.source || 'Other',
    }));
    
    return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('DD MMM'),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;  
};