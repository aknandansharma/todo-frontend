export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const getName = (name) => {
    if (!name) {
        return;
    }

    const word = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(word.length, 2); i++) {
        initials += word[i][0];
    }
    return initials.toUpperCase();
};
