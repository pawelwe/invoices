export const fullNettoValue = (props) => {
    const value = props.services.reduce((a, b) => {
        return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.amount))).toFixed(2);
    }, 0);
    return !isNaN(value) ? value : 0;
};

export const fullVatValue = (props) => {
    const value = props.services.reduce((a, b) => {
        return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.amount) / 100) * b.vat.replace('%', '')).toFixed(2);
    }, 0);
    return !isNaN(value) ? value : 0;
};

export const fullBruttoValue = (props) => {
    const value = props.services.reduce((a, b) => {
        return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.amount)) + ((b.priceNetto * b.amount) / 100) * b.vat.replace('%', '')).toFixed(2);
    }, 0);
    return !isNaN(value) ? value : 0;
};

export const nettoValue = (props) => {
    const value = parseFloat((props.amount * props.priceNetto)).toFixed(2);
    return !isNaN(value) ? value : 0;
};

export const vatValue = (props) => {
    const value = parseFloat((nettoValue(props) * (0 + '.' + parseFloat(props.vat.replace('%', ''))))).toFixed(2);
    return !isNaN(value) ? value : 0;
};

export const bruttoValue = (props) => {
    const value = (parseFloat(nettoValue(props)) + parseFloat(vatValue(props))).toFixed(2);
    return !isNaN(value) ? value : 0;
};