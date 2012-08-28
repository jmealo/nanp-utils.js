function decodeVanity(phone, format) {
    if (typeof phone !== 'string' || phone === undefined || phone.length === 0) {
        return new Error("decodeVanity expects argument 'phone' as string!");
    }

    phone = phone
        .replace(/[abc]/gi, '2')
        .replace(/[def]/gi, '3')
        .replace(/[ghi]/gi, '4')
        .replace(/[jkl]/gi, '5')
        .replace(/[mno]/gi, '6')
        .replace(/[pqrs]/gi, '7')
        .replace(/[tuv]/gi, '8')
        .replace(/[wxyz]/gi, '9');

    return formatPhone(phone, format);
}

function formatPhone(phone, format, options) {
    format = format || 'aaa-bbb-cccc';
    //handle null values, assign defaults

    options = options || {decodeVanity:false};

    if (typeof phone !== 'string' || phone.length === 0) {
        return new Error("formatPhone expects argument 'phone' as string!");
    }

    if (typeof format !== 'string') {
        return new Error("formatPhone expects argument 'format' as string or undefined!");
    } else if (!format.match(/[+i1]*?.*[a]{0,3}.*[b]{3}.*[c]{4}/i)) {
        return new Error("formatPhone was passed an invalid 'format' argument; see documentation.");
    }

    var a, b, c;

    if (options.decodeVanity) {
        phone = decodeVanity(phone);
    }

    phone = phone.replace(/[^a-z\d]/gi, '');
    //remove non-alphanumeric characters and underscores

    if (phone.length == 11) {
        //remove country code to separate digit groups
        phone = phone.slice(1);
    }

    if (phone.length == 10) {
        a = phone.slice(0, 3);
        phone = phone.slice(3);
    }

    if (phone.length == 7) {
        b = phone.slice(0, 3);
        c = phone.slice(3, 7);
    }

    return format
        .replace(/i/i, '1')
        .replace(/a{3}/i, a)
        .replace(/b{3}/i, b)
        .replace(/c{4}/i, c);
}

module.exports = {
    formatPhone : formatPhone,
        decodeVanity : decodeVanity
}