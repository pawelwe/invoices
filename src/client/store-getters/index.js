export const fullNettoValue = (props) => {
    const value = props.services.reduce((a, b) => {
        return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.amount))).toFixed(2);
    }, 0);
    if(!isNaN(value)) {
        return value;
    } else {
        return 0;
    }
};

export const fullVatValue = (props) => {
    const value = props.services.reduce((a, b) => {
        return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.amount) / 100) * b.vat).toFixed(2);
    }, 0);
    if(!isNaN(value)) {
        return value;
    } else {
        return 0;
    }
};

export const fullBruttoValue = (props) => {
    const value = props.services.reduce((a, b) => {
        return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.amount)) + ((b.priceNetto * b.amount) / 100) * b.vat).toFixed(2);
    }, 0);
    if(!isNaN(value)) {
        return value;
    } else {
        return 0;
    }
};

export const nettoValue = (props) => {
    const result = parseFloat((props.amount * props.priceNetto)).toFixed(2);
    if(!isNaN(result)) {
        return result;
    } else {
        return 0;
    }
};

export const vatValue = (props) => {
    const result = parseFloat((nettoValue(props) * (0 + '.' + parseFloat(props.vat)))).toFixed(2);
    if(!isNaN(result)) {
        return result;
    } else {
        return 0;
    }
};

export const bruttoValue = (props) => {
    const result = (parseFloat(nettoValue(props)) + parseFloat(vatValue(props))).toFixed(2);
    if(!isNaN(result)) {
        return result;
    } else {
        return 0;
    }
};