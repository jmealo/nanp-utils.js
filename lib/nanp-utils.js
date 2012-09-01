//     node-nanp-utils 0.0.1
//     (c) 2012 Jeffrey Mealo
//     node-nanp-utils may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://jmealo.github.com/node-nanp-utils/

(function () {
    var nanp = {};

    var root = this;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = nanp;
    } else {
        root.nanp = nanp;
    }


    function isNumber(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }

// ## isNPA (area_code)

// __Checks if an NPA/area code (###-234-5678) complies with the following constraints:__

// * 1st Digit: 2-9
// * 2nd Digit: 0-9
// * 3rd Digit: 0-9

// __Arguments__

// * area_code - a 3-digit string or integer.

// __Returns__

// * Boolean - indicates whether input complies with constraints.


    nanp.isNPA = function isNPA(area_code) {

        area_code += '';

        if (!isNumber(area_code) ||
            typeof area_code.search !== 'function' ||
            area_code.trim().length !== 3) {
            return false;
        }

        return (area_code.search(/([2-9][0-9][0-9])/) !== -1) ? true : false;
    };

// ## isNXX (exchange)

// __Checks if an NXX/exchange (234-###-5678) complies with the following constraints:__

// * 1st Digit: 2-9
// * 2nd Digit: 0-9
// * 3rd Digit: 0-9

// __Arguments__

// * exchange - a 3-digit string or integer.

// __Returns__

// * Boolean - indicates whether input complies with constraints.

    nanp.isNXX = function isNXX(exchange) {

        return nanp.isNPA(exchange);
    };

// ## isSubscriber (exchange)

// __Checks if an subscriber/the last 4 digits (234-567-####) complies with the following constraints:__

// * 1st-4th Digits: 0-9

// __Arguments__

// * subscriber - a 4-digit string or integer.

// __Returns__

// * Boolean - indicates whether input complies with constraints.

    nanp.isSubscriber = function isSubscriber(subscriber) {

        subscriber += '';
        //cast subscriber as a string

        if (!isNumber(subscriber) ||
            typeof subscriber.search !== 'function' ||
            subscriber.trim().length !== 4) {
            return false;
        }

        return (subscriber.search(/[\d]{4}/) !== -1) ? true : false;
    };

// ## NPAtoState (area_code)

//Return the 2 letter state assosciated with a 3-digit NPA area code.
//If an area code is NANP-wide (i.e. 800,888) or part of Canada or a US Territory it returns false

// __Arguments__

// * area_code - a 3-digit string or integer.

// __Returns__

// * **Success**

//String - The 2 letter state assosciated with a 3-digit NPA area code

// * **Failure**

//Boolean - False, the passed NPA is invalid or doesn't correspond to a state.

    nanp.NPAtoState = function NPAtoState(area_code) {
        //Return the 2 letter state assosciated with a 3-digit NPA area code
        //If area code is NANP-wide (i.e. 800-888) or part of Canada/US Territory it returns false

        var isAreaCode, NPA_state;

        isAreaCode = nanp.isNPA(area_code);

        if (isAreaCode === false || typeof isAreaCode !== 'boolean') {
            return new Error("NPAtoState expects argument 'area_code' to be a valid area code in the form of"
                + "a 3-digit string or integer!");
        }

        NPA_state = {
            201:'NJ',
            202:'DC',
            203:'CT',
            205:'AL',
            206:'WA',
            207:'ME',
            208:'ID',
            209:'CA',
            210:'TX',
            212:'NY',
            213:'CA',
            214:'TX',
            215:'PA',
            216:'OH',
            217:'IL',
            218:'MN',
            219:'IN',
            224:'IL',
            225:'LA',
            228:'MS',
            229:'GA',
            231:'MI',
            234:'OH',
            239:'FL',
            240:'MD',
            248:'MI',
            251:'AL',
            252:'NC',
            253:'WA',
            254:'TX',
            256:'AL',
            260:'IN',
            262:'WI',
            267:'PA',
            269:'MI',
            270:'KY',
            276:'VA',
            281:'TX',
            301:'MD',
            302:'DE',
            303:'CO',
            304:'WV',
            305:'FL',
            307:'WY',
            308:'NE',
            309:'IL',
            310:'CA',
            312:'IL',
            313:'MI',
            314:'MO',
            315:'NY',
            316:'KS',
            317:'IN',
            318:'LA',
            319:'IA',
            320:'MN',
            321:'FL',
            323:'CA',
            325:'TX',
            330:'OH',
            331:'IL',
            334:'AL',
            336:'NC',
            337:'LA',
            339:'MA',
            347:'NY',
            351:'MA',
            352:'FL',
            360:'WA',
            361:'TX',
            385:'UT',
            386:'FL',
            401:'RI',
            402:'NE',
            404:'GA',
            405:'OK',
            406:'MT',
            407:'FL',
            408:'CA',
            409:'TX',
            410:'MD',
            412:'PA',
            413:'MA',
            414:'WI',
            415:'CA',
            417:'MO',
            419:'OH',
            423:'TN',
            424:'CA',
            425:'WA',
            430:'TX',
            432:'TX',
            434:'VA',
            435:'UT',
            440:'OH',
            442:'CA',
            443:'MD',
            458:'OR',
            469:'TX',
            470:'GA',
            475:'CT',
            478:'GA',
            479:'AR',
            480:'AZ',
            484:'PA',
            501:'AR',
            502:'KY',
            503:'OR',
            504:'LA',
            505:'NM',
            507:'MN',
            508:'MA',
            509:'WA',
            510:'CA',
            512:'TX',
            513:'OH',
            515:'IA',
            516:'NY',
            517:'MI',
            518:'NY',
            520:'AZ',
            530:'CA',
            534:'WI',
            539:'OK',
            540:'VA',
            541:'OR',
            551:'NJ',
            559:'CA',
            561:'FL',
            562:'CA',
            563:'IA',
            567:'OH',
            570:'PA',
            571:'VA',
            573:'MO',
            574:'IN',
            575:'NM',
            580:'OK',
            585:'NY',
            586:'MI',
            601:'MS',
            602:'AZ',
            603:'NH',
            605:'SD',
            606:'KY',
            607:'NY',
            608:'WI',
            609:'NJ',
            610:'PA',
            612:'MN',
            614:'OH',
            615:'TN',
            616:'MI',
            617:'MA',
            618:'IL',
            619:'CA',
            620:'KS',
            623:'AZ',
            626:'CA',
            630:'IL',
            631:'NY',
            636:'MO',
            641:'IA',
            646:'NY',
            650:'CA',
            651:'MN',
            657:'CA',
            660:'MO',
            661:'CA',
            662:'MS',
            667:'MD',
            671:'GU',
            678:'GA',
            681:'WV',
            682:'TX',
            684:'AS',
            701:'ND',
            702:'NV',
            703:'VA',
            704:'NC',
            706:'GA',
            707:'CA',
            708:'IL',
            710:'US',
            712:'IA',
            713:'TX',
            714:'CA',
            715:'WI',
            716:'NY',
            717:'PA',
            718:'NY',
            719:'CO',
            720:'CO',
            724:'PA',
            727:'FL',
            731:'TN',
            732:'NJ',
            734:'MI',
            740:'OH',
            747:'CA',
            754:'FL',
            757:'VA',
            760:'CA',
            762:'GA',
            763:'MN',
            765:'IN',
            769:'MS',
            770:'GA',
            772:'FL',
            773:'IL',
            774:'MA',
            775:'NV',
            779:'IL',
            781:'MA',
            785:'KS',
            786:'FL',
            787:'PR',
            801:'UT',
            802:'VT',
            803:'SC',
            804:'VA',
            805:'CA',
            806:'TX',
            808:'HI',
            810:'MI',
            812:'IN',
            813:'FL',
            814:'PA',
            815:'IL',
            816:'MO',
            817:'TX',
            818:'CA',
            828:'NC',
            830:'TX',
            831:'CA',
            832:'TX',
            843:'SC',
            845:'NY',
            847:'IL',
            848:'NJ',
            850:'FL',
            856:'NJ',
            857:'MA',
            858:'CA',
            859:'KY',
            860:'CT',
            862:'NJ',
            863:'FL',
            864:'SC',
            865:'TN',
            870:'AR',
            872:'IL',
            878:'PA',
            901:'TN',
            903:'TX',
            904:'FL',
            906:'MI',
            907:'AK',
            908:'NJ',
            909:'CA',
            910:'NC',
            912:'GA',
            913:'KS',
            914:'NY',
            915:'TX',
            916:'CA',
            917:'NY',
            918:'OK',
            919:'NC',
            920:'WI',
            925:'CA',
            928:'AZ',
            929:'NY',
            931:'TN',
            936:'TX',
            937:'OH',
            938:'AL',
            939:'PR',
            940:'TX',
            941:'FL',
            947:'MI',
            949:'CA',
            951:'CA',
            952:'MN',
            954:'FL',
            956:'TX',
            970:'CO',
            971:'OR',
            972:'TX',
            973:'NJ',
            978:'MA',
            979:'TX',
            980:'NC',
            984:'NC',
            985:'LA',
            989:'MI'
        };

        return (NPA_state[area_code] === undefined) ? false : NPA_state[area_code];
    };

    nanp.formatPhone = function formatPhone(phone, format, options) {
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

        if (phone.length === 11) {
            //remove country code to separate digit groups
            phone = phone.slice(1);
        }

        if (phone.length === 10) {
            a = phone.slice(0, 3);
            phone = phone.slice(3);
        }

        if (phone.length === 7) {
            b = phone.slice(0, 3);
            c = phone.slice(3, 7);
        }

        return format
            .replace(/i/i, '1')
            .replace(/a{3}/i, a)
            .replace(/b{3}/i, b)
            .replace(/c{4}/i, c);
    };

    nanp.decodeVanity = function decodeVanity(phone, format) {
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

        return nanp.formatPhone(phone, format);
    };

    nanp.validatePhone = function validatePhone(phone_number) {

        var npa, nxx, subscriber, return_val = {};

        //If the phone number is not valid:
        //returns: an key/value pair of invalid parts of the phone number
        //example: If the area code (123) is invalid we'd get {NPA: 123}
        //------------------------------
        //If the phone number is valid:
        //returns: true

        //Decode vanity numbers
        if (phone_number.search(/[A-Z]/i) !== -1) {
            phone_number = nanp.decodeVanity(phone_number);
        }

        phone_number = phone_number.replace(/[^a-z\d]/gi, '');

        //Split number into NPA, NXX, Subscriber

        if (phone_number.length === 11) {
            //remove country code to separate digit groups
            phone_number = phone_number.slice(-10);
        }

        console.log(phone_number);

        npa = phone_number.substr(0,3);
        nxx = phone_number.substr(3,3);
        subscriber = phone_number.substr(6,4);

        return_val.NPA = [nanp.isNPA(npa), npa];
        return_val.NXX = [nanp.isNXX(nxx), nxx];
        return_val.subscriber = [nanp.isSubscriber(subscriber), subscriber];
        return_val.isValid = (return_val.NPA[0] && return_val.NXX[0] && return_val.subscriber[0]);

        return return_val;

    };

}
    ()
    )
;