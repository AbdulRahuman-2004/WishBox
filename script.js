
"use strict";

const $ = (id) => document.getElementById(id);

const form = $("messageForm");
const resultSection = $("resultSection");
const canvas = $("greetingCanvas");
const ctx = canvas.getContext("2d");

let currentMessage = "";
let currentImageBlob = null;


const messages = {
    love: {
        english: [
            "You make my world brighter just by being in it. I am so lucky to have you. 💜",
            "Every little moment with you becomes a beautiful memory. You mean so much to me. ❤️",
            "No matter where life takes us, a special place in my heart will always belong to you. 💕",
            "You are the reason my heart believes in beautiful things. 💜",
            "I don't need a fairytale because my reality with you is already magical. ❤️",
            "Every little thing about you makes me fall for you again. 🌹",
            "My favourite notification will always be your name on my screen. 💕",
            "You entered my life quietly and became my biggest happiness. 🦋",
            "I want to be the reason behind your happiest smiles. 🫂",
            "Loving you is my favourite feeling, and choosing you is my favourite decision. 💗",
            "Even silence feels beautiful when I am with you. ❤️",
            "You are my once-in-a-lifetime kind of person. 💜",
            "If I could gift you something, I would give you the ability to see yourself through my eyes. 🌷"

        ],
        tamil: [
            "நீ என் வாழ்க்கையில் வந்த பிறகு ஒவ்வொரு நாளும் அழகான நினைவாக மாறிவிட்டது. நீ எனக்கு மிகவும் முக்கியமானவர். 💜",
            "உன் சிரிப்பில் என் சந்தோஷமும், உன் அன்பில் என் உலகமும் இருக்கிறது. ❤️",
            "எத்தனை நாட்கள் கடந்தாலும் என் மனதில் உனக்கான இடம் என்றும் மாறாது. 💕",
            "என் இதயம் அழகான விஷயங்களை நம்புவதற்குக் காரணம் நீதான். 💜",
            "எனக்குத் தேவதை கதைகள் வேண்டாம்; உன்னுடன் இருக்கும் வாழ்க்கையே ஒரு அழகான மாயம். ❤️",
            "உன்னிடம் இருக்கும் ஒவ்வொரு சிறிய விஷயமும் மீண்டும் மீண்டும் உன்னை காதலிக்க வைக்கிறது. 🌹",
            "என் கைப்பேசியில் எனக்குப் பிடித்த அறிவிப்பு உன் பெயர்தான். 💕",
            "அமைதியாக என் வாழ்க்கைக்குள் வந்து என் மிகப்பெரிய மகிழ்ச்சியாக மாறிவிட்டாய். 🦋",
            "உன் முகத்தில் வரும் மகிழ்ச்சியான புன்னகைக்குக் காரணமாக இருக்க விரும்புகிறேன். 🫂",
            "உன்னை காதலிப்பது என் மனதிற்குப் பிடித்த உணர்வு; உன்னைத் தேர்ந்தெடுத்தது என் அழகான முடிவு. 💗",
            "உன்னுடன் இருக்கும்போது மௌனம்கூட அழகாகத் தெரிகிறது. ❤️",
            "என் வாழ்வில் ஒருமுறை மட்டுமே கிடைக்கும் அற்புதமான நபர் நீதான். 💜",
            "உன்னை என் கண்களால் அல்ல, என் இதயத்தால் பார்க்கும் அழகை உனக்குப் பரிசளிக்க விரும்புகிறேன். 🌷"
        ],
        tanglish: [
            "Nee en life la vandhadhula irundhu ovvoru naalum beautiful memory ah maariduchu. Nee enakku romba special. 💜",
            "Un smile la en happiness irukku, un love la en world irukku. ❤️",
            "Evlo naal ponaalum en heart la unakku irukkura place maaradhu. 💕",
            "En heart beautiful things ah namburadhukku reason nee dhaan. 💜",
            "Enakku fairytale venam; un kooda irukkura reality eh magical ah irukku. ❤️",
            "Un kitta irukkura ovvoru small thing um unna thirumba thirumba love panna veikkudhu. 🌹",
            "En phone la enakku pidicha notification eppovum un name dhaan. 💕",
            "Silent ah en life kulla vandhu en biggest happiness ah maaritta. 🦋",
            "Un face la varra happiest smile ku reason ah irukkanum nu aasai. 🫂",
            "Unna love panradhu en favourite feeling; unna choose pannadhu en favourite decision. 💗",
            "Un kooda irukkumbodhu silence kooda beautiful ah irukku. ❤️",
            "En life la once in a lifetime kidaikkura special person nee dhaan. 💜",
            "Unna en eyes moolama illa, en heart moolama paakkura beauty ah unakku gift panna aasai. 🌷"
        ]
    },

    friendship: {
        english: [
            "A true friend makes every ordinary day special. Thank you for being that person in my life. 💚",
            "Life is better with a friend like you. May our friendship always stay beautiful. 🫂",
            "Some people become memories, but friends like you become a part of our story forever. 💜",
            "A good friend knows your stories; a best friend helps you create them. 💜",
            "Our friendship is my favourite collection of memories. 🫶",
            "Thank you for being my comfort person on difficult days. ❤️",
            "No distance can change a friendship built with genuine hearts. 🦋",
            "You make even the most boring days unforgettable. 😂",
            "A friend like you is a blessing I never want to lose. 💕",
            "We may fight, tease and argue, but our friendship stays strong. 😄",
            "Life gave me many people, but only a few became special. You are one of them. 💗",
            "I hope we grow old and still laugh at our silly memories. 🫂",
            "You are proof that family can also be chosen. 💜"
        ],
        tamil: [
            "சாதாரண நாட்களையும் அழகான நினைவுகளாக மாற்றுவது உன்னைப் போன்ற நண்பர்கள்தான். 💚",
            "உன்னைப் போன்ற ஒரு நண்பர் கிடைத்தது என் வாழ்க்கையின் அழகான பரிசு. 🫂",
            "நம் நட்பு என்றும் இதே அன்போடும் மகிழ்ச்சியோடும் தொடரட்டும். 💜",
            "நல்ல நண்பன் உன் கதைகளை அறிவான்; சிறந்த நண்பன் உன்னுடன் புதிய கதைகளை உருவாக்குவான். 💜",
            "நம் நட்புதான் என் வாழ்க்கையின் மிகவும் பிடித்தமான நினைவுகளின் தொகுப்பு. 🫶",
            "கடினமான நாட்களில் எனக்கு ஆறுதலாக இருப்பதற்கு நன்றி. ❤️",
            "உண்மையான மனங்களால் உருவான நட்பை எந்தத் தூரமும் மாற்ற முடியாது. 🦋",
            "மிகவும் சலிப்பான நாட்களைக்கூட மறக்க முடியாத நினைவுகளாக மாற்றிவிடுகிறாய். 😂",
            "உன்னைப் போன்ற நண்பர் கிடைத்தது நான் பெற்ற வரம். 💕",
            "சண்டை போட்டாலும், கேலி செய்தாலும் நம் நட்பு மட்டும் என்றும் வலிமையாக இருக்கும். 😄",
            "வாழ்க்கையில் பலர் வந்தாலும், சிலர்தான் மனதிற்கு நெருக்கமானவர்களாக மாறுவார்கள். அதில் நீயும் ஒருவர். 💗",
            "வயதாகியும் நம் பழைய முட்டாள்தனமான நினைவுகளை நினைத்து சிரிக்க வேண்டும். 🫂",
            "குடும்பம் என்பது பிறப்பால் மட்டுமல்ல, அன்பால் தேர்ந்தெடுக்கப்படுவதும்தான். 💜"
        ],

        tanglish: [
            "Ordinary days ah kooda beautiful memories ah maathuradhu un maadhiri friends dhaan. 💚",
            "Unna maadhiri oru friend kidaichadhu en life oda beautiful gift. 🫂",
            "Namma friendship eppovum idhe love and happiness oda continue aaganum. 💜",
            "Good friend un stories ah therinjiruppanga; best friend un kooda pudhu stories create pannuvaanga. 💜",
            "Namma friendship dhaan en life la favourite memories collection. 🫶",
            "Difficult days la enakku comfort ah irundhadhukku thanks. ❤️",
            "Genuine hearts la create aana friendship ah endha distance um change panna mudiyadhu. 🦋",
            "Romba boring days ah kooda unforgettable memories ah maathiduva. 😂",
            "Unna maadhiri friend kidaichadhu enakku oru blessing. 💕",
            "Sandai pottaalum, tease pannaalum namma friendship strong ah dhaan irukkum. 😄",
            "Life la neraya people vandhaalum, konjam per dhaan special ah maaruvaanga. Andha list la nee yum irukka. 💗",
            "Vayasu aanaalum namma old silly memories ah nenachu sirikkanum. 🫂",
            "Family na blood relation mattum illa; love nala choose panra people um dhaan. 💜"
        ]
    },

    birthday: {
        english: [
            "Happy Birthday! May your day be filled with smiles, beautiful memories and everything your heart wishes for. 🎂",
            "Wishing you a wonderful birthday and a year full of happiness, success and love. 🎉",
            "Today is all about celebrating you. Keep smiling and keep shining. Happy Birthday! 💜",
            "May your birthday open the door to a year full of wonderful opportunities. 🎂",
            "Keep chasing your dreams and never stop believing in yourself. Happy Birthday! 💜",
            "May every candle you blow out bring a new reason to smile. 🎉",
            "You deserve happiness today, tomorrow and every day after that. ❤️",
            "Another year older, wiser and more wonderful. Enjoy your special day! 🥳",
            "May your heart always be light and your future incredibly bright. 🌟",
            "Sending you endless smiles, warm hugs and beautiful birthday wishes. 🫂",
            "May this year surprise you with everything your heart has been waiting for. 💐",
            "Your existence makes this world a little more beautiful. Happy Birthday! 💗",
            "Celebrate yourself today because you are truly special. 🎂"
        ],
        tamil: [
            "இனிய பிறந்தநாள் வாழ்த்துகள்! உன் வாழ்க்கை முழுவதும் மகிழ்ச்சியும் அன்பும் நிறைந்திருக்கட்டும். 🎂",
            "உன் ஆசைகள் அனைத்தும் நிறைவேறி, ஒவ்வொரு நாளும் அழகாக அமையட்டும். இனிய பிறந்தநாள் வாழ்த்துகள்! 🎉",
            "இன்று உனக்கான அழகான நாள். என்றும் சிரித்துக்கொண்டே இரு. பிறந்தநாள் வாழ்த்துகள்! 💜",
            "இந்தப் பிறந்தநாள் உன் வாழ்க்கையில் புதிய வாய்ப்புகளும் அழகான வெற்றிகளும் நிறைந்த ஆண்டைத் தொடங்கட்டும். 🎂",
            "உன் கனவுகளைத் தொடர்ந்து செல்; உன் மீது இருக்கும் நம்பிக்கையை ஒருபோதும் இழக்காதே. இனிய பிறந்தநாள் வாழ்த்துகள்! 💜",
            "நீ அணைக்கும் ஒவ்வொரு மெழுகுவர்த்தியும் உன் வாழ்க்கையில் ஒரு புதிய மகிழ்ச்சியைக் கொண்டு வரட்டும். 🎉",
            "இன்றும், நாளையும், என்றும் நீ மகிழ்ச்சியாக வாழத் தகுதியானவன். ❤️",
            "இன்னொரு வருடம் அனுபவமும் அறிவும் அழகும் நிறைந்ததாக அமையட்டும். 🥳",
            "உன் மனம் எப்போதும் மகிழ்ச்சியாகவும், உன் எதிர்காலம் ஒளிமயமாகவும் இருக்கட்டும். 🌟",
            "எல்லையில்லா புன்னகைகள், அன்பான அணைப்புகள், இனிய வாழ்த்துகள் உனக்காக! 🫂",
            "இந்த வருடம் உன் மனம் எதிர்பார்த்த எல்லா நல்ல விஷயங்களையும் கொண்டு வரட்டும். 💐",
            "நீ இந்த உலகில் இருப்பதே இந்த உலகிற்கு ஒரு அழகு. இனிய பிறந்தநாள் வாழ்த்துகள்! 💗",
            "இன்று உன்னைக் கொண்டாடு; ஏனென்றால் நீ உண்மையிலேயே சிறப்பானவன். 🎂"
        ],
        tanglish: [
            "Happy Birthday! Un life full ah happiness, love and beautiful memories irukkattum. 🎂",
            "Un wishes ellam fulfil aagi, ovvoru naalum special ah irukkattum. Happy Birthday! 🎉",
            "Innaiku unakku special day. Eppovum ippadiye smile pannitte iru. Happy Birthday! 💜",
            "Indha birthday un life la new opportunities um beautiful success um nirainja year ah start pannattum. 🎂",
            "Un dreams ah chase pannu; unna pathina confidence ah eppovum lose pannadha. Happy Birthday! 💜",
            "Nee blow panra ovvoru candle um un life la oru new happiness kondu varattum. 🎉",
            "Innaikkum, naalaikkum, eppovum nee happy ah vaazha deserve panra. ❤️",
            "Innor year experience, wisdom, beauty ellam un kooda grow aagattum. 🥳",
            "Un heart eppovum light ah irukkanum; un future bright ah irukkanum. 🌟",
            "Endless smiles, warm hugs, beautiful birthday wishes ellame unakkaga! 🫂",
            "Indha year un heart wait pannura ella good things um kondu varattum. 💐",
            "Nee indha world la irukkuradhe indha world ah konjam beautiful ah maathudhu. 💗",
            "Innaikku unna celebrate pannu; because nee really special. 🎂"


        ]
    },

    anniversary: {
        english: [
            "Happy Anniversary! Every moment with you is a memory I want to treasure forever. 💕",
            "Another year of love, laughter and beautiful memories. Here's to many more together. 🥂",
            "The best part of my journey is having you beside me. Happy Anniversary! 💜",
            "The best part of my journey is having you beside me. Happy Anniversary! ❤️",
            "Every year with you adds another beautiful page to our story. 💕",
            "I don't count the years; I count the beautiful memories we create. 🌹",
            "May our love always find new reasons to grow. 💜",
            "You are still my favourite person to share every little thing with. 🫂",
            "Our story is my favourite story, and I never want it to end. ❤️",
            "Thank you for making every season of life more beautiful. 🌷",
            "One more year of choosing each other, understanding each other and growing together. 💗",
            "May our hands never let go and our hearts never grow apart. 🦋",
            "The journey is beautiful because I am walking it with you. Happy Anniversary! 💐"
        ],
        tamil: [
            "இனிய ஆண்டு நிறைவு நாள் வாழ்த்துகள்! உன்னுடன் இருக்கும் ஒவ்வொரு நொடியும் எனக்கு பொக்கிஷம். 💕",
            "அன்பும் சிரிப்பும் நிறைந்த இன்னொரு அழகான ஆண்டு. இன்னும் பல ஆண்டுகள் ஒன்றாக பயணிப்போம். 💜",
            "என் வாழ்க்கைப் பயணத்தில் நீ என்னுடன் இருப்பதே மிகப்பெரிய மகிழ்ச்சி. ❤️",
            "என் வாழ்க்கைப் பயணத்தின் அழகான பகுதி, உன்னை என் அருகில் வைத்திருப்பதுதான். இனிய ஆண்டு நிறைவு நாள்! ❤️",
            "உன்னுடன் கடக்கும் ஒவ்வொரு வருடமும் நம் கதையில் இன்னொரு அழகான பக்கத்தைச் சேர்க்கிறது. 💕",
            "நான் வருடங்களைக் கணக்கிடுவதில்லை; நாம் உருவாக்கும் அழகான நினைவுகளையே கணக்கிடுகிறேன். 🌹",
            "நம் அன்பு வளர்வதற்கு இன்னும் பல காரணங்கள் கிடைக்கட்டும். 💜",
            "என் ஒவ்வொரு சிறிய விஷயத்தையும் பகிர்ந்துகொள்ள நான் விரும்பும் நபர் நீதான். 🫂",
            "நம் காதல் கதைதான் எனக்குப் பிடித்தமான கதை; அது ஒருபோதும் முடியக்கூடாது. ❤️",
            "வாழ்க்கையின் ஒவ்வொரு காலத்தையும் அழகாக்கியதற்கு நன்றி. 🌷",
            "இன்னொரு வருடம் ஒருவரை ஒருவர் தேர்ந்தெடுத்து, புரிந்துகொண்டு, ஒன்றாக வளர்வோம். 💗",
            "நம் கைகள் ஒருபோதும் பிரியாமலும், நம் இதயங்கள் ஒருபோதும் விலகாமலும் இருக்கட்டும். 🦋",
            "உன்னுடன் நடப்பதால்தான் நம் பயணம் இவ்வளவு அழகாக இருக்கிறது. இனிய ஆண்டு நிறைவு நாள்! 💐"

        ],
        tanglish: [
            "Happy Anniversary! Un kooda irukkura ovvoru moment um enakku precious memory. 💕",
            "Love, laughter and beautiful memories oda innoru year. Innum neraya years together iruppom. 💜",
            "En life journey la nee en kooda irukkuradhu dhaan biggest happiness. ❤️",
            "En life journey la beautiful part nee en kooda irukkuradhu dhaan. Happy Anniversary! ❤️",
            "Un kooda spend panra ovvoru year um namma story la innoru beautiful page add pannudhu. 💕",
            "Naan years ah count panradhu illa; namma create panra beautiful memories ah dhaan count panren. 🌹",
            "Namma love grow aaguradhukku innum neraya reasons kidaikattum. 💜",
            "En ovvoru small thing um share panna enakku pidicha person nee dhaan. 🫂",
            "Namma love story dhaan en favourite story; adhu eppovum mudiyave koodadhu. ❤️",
            "Life oda ovvoru season um beautiful ah maathunadhukku thanks. 🌷",
            "Innor year um oruthara oruthar choose panni, understand panni, serndhu grow pannuvom. 💗",
            "Namma hands eppovum piriyama, namma hearts eppovum distance aagama irukkanum. 🦋",
            "Un kooda nadakkuradhunaala dhaan namma journey ivlo beautiful ah irukku. Happy Anniversary! 💐"
        ]
    },

    sorry: {
        english: [
            "I may not always find the right words, but I never want to hurt you. I am truly sorry. 💜",
            "Please forgive me. Your happiness and our bond mean a lot to me. 🫂",
            "I know I made a mistake. I hope we can leave the hurt behind and smile again. ❤️",
            "I wish I could take back the words that hurt you. I am truly sorry. 💜",
            "You deserve understanding, not arguments. Please forgive me. ❤️",
            "I know I made a mistake, and I don't want my ego to stand between us. 🫂",
            "I never wanted to become the reason for your tears. I'm sorry. 💗",
            "Please don't let one bad moment erase all our beautiful memories. 🌹",
            "I may be wrong, but losing your trust is the last thing I want. 💕",
            "I am sorry for not understanding your feelings when you needed me. 🦋",
            "I cannot promise perfection, but I can promise to learn from my mistakes. 💜",
            "Your feelings matter, and I should have listened more carefully. ❤️",
            "I hope time and honesty can heal what my mistake has hurt. 🫶"
        ],
        tamil: [
            "எப்போதும் சரியான வார்த்தைகளைச் சொல்ல முடியாமல் போகலாம். ஆனால் உன்னை காயப்படுத்த வேண்டும் என்பது என் எண்ணமல்ல. மன்னித்துவிடு. 💜",
            "என் தவறை புரிந்துகொள்கிறேன். உன் மனதை வருத்தியதற்கு உண்மையாக மன்னிப்பு கேட்கிறேன். 🫂",
            "நம் உறவு எனக்கு மிகவும் முக்கியம். நடந்ததை மறந்து மீண்டும் சிரிக்கலாம். ❤️",
            "உன் மனதைப் புண்படுத்திய அந்த வார்த்தைகளைத் திரும்பப் பெற முடிந்தால் எவ்வளவு நன்றாக இருக்கும். உண்மையாக மன்னித்துவிடு. 💜",
            "உனக்குத் தேவையானது புரிதல்தான்; வாக்குவாதம் அல்ல. என்னை மன்னித்துவிடு. ❤️",
            "நான் தவறு செய்துவிட்டேன் என்பதை ஏற்றுக்கொள்கிறேன். என் பிடிவாதம் நமக்குள் தடையாக இருக்க வேண்டாம். 🫂",
            "உன் கண்ணீருக்குக் காரணமாக நான் ஒருபோதும் இருக்க விரும்பவில்லை. மன்னித்துவிடு. 💗",
            "ஒரு மோசமான தருணம் நம்முடைய அழகான நினைவுகளை அழித்துவிட வேண்டாம். 🌹",
            "நான் தவறு செய்திருக்கலாம்; ஆனால் உன் நம்பிக்கையை இழக்க விரும்பவில்லை. 💕",
            "உனக்கு என் புரிதல் தேவைப்பட்ட நேரத்தில் உன் உணர்வுகளைப் புரிந்துகொள்ளாததற்கு வருந்துகிறேன். 🦋",
            "நான் எப்போதும் சரியாக இருப்பேன் என்று சொல்ல முடியாது; ஆனால் என் தவறுகளிலிருந்து கற்றுக்கொள்வேன். 💜",
            "உன் உணர்வுகள் முக்கியமானவை. நான் இன்னும் கவனமாகக் கேட்டிருக்க வேண்டும். ❤️",
            "என் தவறால் ஏற்பட்ட காயத்தை நேர்மையும் காலமும் ஆற்றும் என்று நம்புகிறேன். 🫶"
        ],
        tanglish: [
            "Sila neram correct ah pesa mudiyama pogalam. Aana unna hurt pannanum nu enakku eppovum thonala. Sorry. 💜",
            "En mistake ah purinjikitten. Un manasa hurt pannadhukku unmaiya sorry. 🫂",
            "Namma bond enakku romba important. Nadandhadha marandhuttu marubadiyum smile pannalam. ❤️",
            "Un manasa hurt panna andha words ah thirumba vaanga mudinja evlo nalla irukkum. Really sorry. 💜",
            "Unakku thevai understanding dhaan; arguments illa. Please manichidu. ❤️",
            "Naan mistake panniten nu accept panren. En ego namakkulla problem ah irukka vendam. 🫂",
            "Un tears ku naan eppovum reason ah irukka virumbala. Sorry. 💗",
            "Oru bad moment namma beautiful memories ah erase pannida vendam. 🌹",
            "Naan wrong ah irukkalaam; aana un trust ah lose panna virumbala. 💕",
            "Unakku en understanding thevaiyaana nerathula un feelings ah purinjukkama poitten. Sorry. 🦋",
            "Naan eppovum perfect ah iruppen nu solla mudiyadhu; aana en mistakes la irundhu learn pannuven. 💜",
            "Un feelings important. Naan innum konjam careful ah listen pannirukkanum. ❤️",
            "En mistake nala vandha pain ah time um honesty um heal pannum nu namburen. 🫶"
        ]
    },

    missyou: {
        english: [
            "No matter how far you are, you are always close to my heart. I miss you. 💜",
            "Some moments feel incomplete because you are not here. Missing you so much. 🫂",
            "I wish I could turn this distance into a hug. Until then, sending you all my love",

            "I miss you in moments when I least expect it. 💜",
            "The distance between us is real, but so is the love I feel. ❤️",
            "I wish I could turn every memory into another moment with you. 🦋",
            "My days feel incomplete without our little conversations. 💕",
            "Sometimes all I need is one hug from you. 🫂",
            "I look at my phone hoping your name appears. 💗",
            "Even the happiest moments make me wish you were here. 🌹",
            "I miss the little things that we never knew would become memories. 💜",
            "No matter how far you are, you are always close to my heart. ❤️",
            "Until we meet again, I will keep collecting reasons to miss you. 🦋"

        ],
        tamil: [
            "நீ எவ்வளவு தூரத்தில் இருந்தாலும் என் மனதிற்கு மிகவும் அருகில்தான் இருக்கிறாய். உன்னை மிஸ் செய்கிறேன். 💜",
            "நீ அருகில் இல்லாத ஒவ்வொரு நொடியும் ஏதோ ஒன்று குறைவாக இருப்பது போல உணர்கிறேன். 🫂",
            "இந்த தூரத்தை ஒரு அணைப்பாக மாற்ற முடிந்தால் எவ்வளவு நன்றாக இருக்கும். ❤️",
            "எதிர்பாராத நேரங்களில்கூட உன் நினைவுகள் என்னைத் தேடி வருகின்றன. 💜",
            "நமக்கிடையே தூரம் இருக்கலாம்; ஆனால் என் அன்பு உண்மையானது. ❤️",
            "ஒவ்வொரு நினைவையும் உன்னுடன் இருக்கும் இன்னொரு தருணமாக மாற்ற முடிந்தால் எவ்வளவு அழகாக இருக்கும். 🦋",
            "நம் சிறிய உரையாடல்கள் இல்லாமல் என் நாட்கள் முழுமையடைவதில்லை. 💕",
            "சில நேரங்களில் உன் ஒரு அணைப்பு மட்டுமே எனக்குத் தேவைப்படுகிறது. 🫂",
            "என் கைப்பேசியில் உன் பெயர் வருமா என்று அடிக்கடி பார்க்கிறேன். 💗",
            "எவ்வளவு மகிழ்ச்சியாக இருந்தாலும், நீ அருகில் இருந்தால் இன்னும் அழகாக இருக்கும் என்று தோன்றுகிறது. 🌹",
            "ஒருநாள் நினைவுகளாக மாறும் என்று தெரியாமல் நாம் பகிர்ந்துகொண்ட அந்தச் சிறிய தருணங்களை நினைக்கிறேன். 💜",
            "நீ எவ்வளவு தூரத்தில் இருந்தாலும் என் இதயத்திற்கு அருகில்தான் இருக்கிறாய். ❤️",
            "மீண்டும் சந்திக்கும் நாள் வரை உன்னை நினைப்பதற்கான காரணங்களைச் சேகரித்துக்கொண்டே இருப்பேன். 🦋"
        ],
        tanglish: [
            "Nee evlo dhoorathula irundhaalum en heart ku romba close ah dhaan irukka. Miss you. 💜",
            "Nee pakkathula illaadha ovvoru moment um something missing madhiri irukku. 🫂",
            "Indha distance ah oru hug ah maatha mudinja evlo nalla irukkum. ❤️",
            "Naan expect pannadha moments layum un nyabagangal enna thedi varudhu. 💜",
            "Namakulla distance irukkalaam; aana en love real dhaan. ❤️",
            "Ovvoru memory yum un kooda irukkura innoru moment ah maatha mudinja evlo beautiful ah irukkum. 🦋",
            "Namma small conversations illaama en days complete aagura maadhiri illa. 💕",
            "Sila neram un oru hug mattum dhaan enakku thevai. 🫂",
            "En phone la un name varuma nu adikkadi check panren. 💗",
            "Evlo happy ah irundhaalum nee pakkathula irundha innum beautiful ah irukkum nu thonudhu. 🌹",
            "Oru naal memories ah maarum nu theriyama share pannina small moments ah miss panren. 💜",
            "Nee evlo distance la irundhaalum en heart kku close ah dhaan irukka. ❤️",
            "Thirumba meet panra naal varaikkum unna miss panradhukku reasons collect pannitte iruppen. 🦋"


        ]
    },

    thanks: {
        english: [
            "Thank you for being there and making things a little brighter. I truly appreciate you. 💚",
            "Your kindness means more than words can say. Thank you so much. 💜",
            "I am grateful for you and everything you do. Thank you from my heart. ❤️",
            "Thank you for being the reason behind my smile. 💜",
            "Some people make life beautiful just by being there. Thank you! 🌸",
            "I may not say it every day, but I truly appreciate you.",
            "Your kindness means more than words can explain. ❤️",
            "Thank you for making even ordinary moments special.",
            "A little thank you for a person who deserves a lot more.",
            "Your support has made a big difference in my life.",
            "I am lucky to have someone like you. Thank you! 🫂",
            "Words are not enough to express my gratitude.",
            "Thank you for always making things better."
        ],
        tamil: [
            "எனக்காக இருந்ததற்கும், என் நாட்களை அழகாக்கியதற்கும் மனமார்ந்த நன்றி. 💚",
            "உன் அன்பும் உதவியும் வார்த்தைகளால் சொல்ல முடியாத அளவுக்கு மதிப்பானது. நன்றி. 💜",
            "நீ செய்த அனைத்திற்கும் என் மனமார்ந்த நன்றி. ❤️",
            "என் முகத்தில் சிரிப்பை வரவழைக்கும் உனக்கு என் மனமார்ந்த நன்றி! 💜",
            "நீ என் வாழ்க்கையில் இருப்பதே ஒரு அழகான வரம். நன்றி! 🌸",
            "தினமும் சொல்லாவிட்டாலும் உன்னை மனதார பாராட்டுகிறேன்.",
            "உன் அன்புக்கும் உதவிக்கும் வார்த்தைகளால் நன்றி சொல்ல முடியாது.",
            "சாதாரண தருணங்களையும் அழகான நினைவுகளாக்கியதற்கு நன்றி.",
            "ஒரு சிறிய நன்றி... ஆனால் அதற்குள் நிறைய அன்பு இருக்கிறது! ❤️",
            "உன் ஆதரவு என் வாழ்க்கையில் பெரிய மாற்றத்தை ஏற்படுத்தியுள்ளது.",
            "உன்னைப் போன்ற ஒருவர் என் வாழ்க்கையில் இருப்பது என் அதிர்ஷ்டம்.",
            "என் நன்றியை வெளிப்படுத்த வார்த்தைகள் போதாது.",
            "எல்லாவற்றையும் அழகாக மாற்றும் உனக்கு என் நன்றி! 🫂"
        ],
        tanglish: [
            "Enakku support ah irundhadhukkum, en days ah bright ah maathunadhukkum romba thanks. 💚",
            "Un kindness words la solla mudiyadha alavukku valuable. Thank you so much. 💜",
            "Nee enakku senja ellathukkum en manasaara thanks. ❤️",
            "En mugathula sirippu vara kaaranama irukkura unakku thanks! 💜",
            "Nee en life-la irukkuradhe oru beautiful gift. 🌸",
            "Daily sollalenaalum unna manasara appreciate panren.",
            "Un anbum help-um words-la solla mudiyatha alavukku valuable.",
            "Normal moments-ah beautiful memories-ah maathunathukku thanks.",
            "Oru small thanks... aana athukkulla neraya love irukku! ❤️",
            "Un support en life-la periya difference create pannirukku.",
            "Unna maathiri oruthar en life-la irukkurathu en luck.",
            "En gratitude-ah express panna words pathathu.",
            "Ella situation-um better-ah maathura unakku thanks! 🫂"
        ]
    },

    congratulations: {
        english: [
            "Congratulations! Your hard work has brought you here. Keep believing in yourself and keep shining. 🎉",
            "You did it! Wishing you even more success and happiness in everything ahead. 💜",
            "This achievement is just the beginning of many wonderful things. So proud of you! 🌟",
            "Your hard work finally turned into success. Congratulations! 🎉",
            "This is just the beginning of many beautiful achievements.",
            "You dreamed it, worked for it, and now you deserve it!",
            "Your success makes everyone around you proud. ❤️",
            "A big congratulations to someone who never gave up!",
            "Every effort has brought you closer to this moment.",
            "You proved that patience and hard work always matter.",
            "Keep shining, keep growing, and keep achieving! ✨",
            "Today is your day. Celebrate every bit of your success!",
            "One achievement down, countless dreams to go!"
        ],
        tamil: [
            "மனமார்ந்த வாழ்த்துகள்! உன் உழைப்பிற்கான அழகான வெற்றி இது. இன்னும் பல வெற்றிகள் கிடைக்கட்டும். 🎉",
            "நீ சாதித்துவிட்டாய்! உன் அடுத்தடுத்த முயற்சிகளும் வெற்றியாக அமையட்டும். 💜",
            "இது இன்னும் பல சாதனைகளின் தொடக்கமாக இருக்கட்டும். உன்னை நினைத்து பெருமைப்படுகிறேன். 🌟",
            "உன் கடின உழைப்புக்கு கிடைத்த அழகான வெற்றி இது! வாழ்த்துகள்! 🎉",
            "இது இன்னும் பல சாதனைகளுக்கான ஆரம்பம் மட்டுமே.",
            "கனவு கண்டாய், உழைத்தாய், இன்று அதை அடைந்துவிட்டாய்!",
            "உன் வெற்றி எங்களை எல்லோரையும் பெருமைப்பட வைக்கிறது. ❤️",
            "முயற்சியை ஒருபோதும் கைவிடாத உனக்கு மனமார்ந்த வாழ்த்துகள்!",
            "ஒவ்வொரு முயற்சியும் உன்னை இந்த வெற்றிக்கு அருகில் கொண்டு வந்தது.",
            "பொறுமையும் உழைப்பும் வெற்றியைத் தரும் என்பதை நிரூபித்துவிட்டாய்.",
            "தொடர்ந்து ஜொலித்துக் கொண்டே இரு! ✨",
            "இன்று உன்னுடைய நாள்! உன் வெற்றியை மனதார கொண்டாடு!",
            "ஒரு சாதனை முடிந்தது... இன்னும் பல கனவுகள் காத்திருக்கின்றன!"
        ],
        tanglish: [
            "Congratulations! Un hard work ku kidaicha beautiful success idhu. Innum neraya victories varattum. 🎉",
            "Nee achieve pannitta! Un future efforts ellam success ah maarattum. 💜",
            "Idhu innum neraya achievements oda beginning ah irukkattum. Proud of you! 🌟",
            "Un hard work-ku kidaicha beautiful success idhu! Congratulations! 🎉",
            "Idhu innum pala achievements-ku starting mattum dhaan.",
            "Kanavu kanda, adhukkaaga uzhaicha, ippo achieve pannitta!",
            "Un success engala ellarayum proud-ah feel panna vaikkuthu. ❤️",
            "Never give up pannatha unakku heartfelt congratulations!",
            "Ovvoru effort-um unna indha success-kitta kondu vandhirukku.",
            "Patience-um hard work-um success kudukkum-nu prove pannitta.",
            "Innum shine pannu, grow pannu, achieve pannu! ✨",
            "Innaiku un day! Un success-ah happy-ah celebrate pannu!",
            "Oru achievement mudinjiduchu... innum neraya dreams irukku!"
        ]
    },

    justbecause: {
        english: [
            "Just a little reminder that you are special and appreciated. Hope this makes you smile. 💜",
            "No special occasion needed to remind you that you matter to me. Sending you a little happiness. 🌸",
            "I just wanted to make your day a little brighter. Keep smiling! ❤️",
            "No special reason. I just wanted to make you smile. 💜",
            "You crossed my mind, so here is a little happiness for you.",
            "Just a random reminder that you are special to me.",
            "Some people deserve love even on ordinary days. You are one of them.",
            "I don't need a reason to make you feel special.",
            "A little message to brighten your ordinary day. 🌸",
            "Just because you exist, someone's world is more beautiful.",
            "Nothing special happened today. I just wanted to say I care.",
            "You deserve unexpected happiness, today and every day.",
            "Sending you a little smile without any reason! 😊"
        ],
        tamil: [
            "நீ எனக்கு மிகவும் முக்கியமானவர் என்பதை நினைவூட்ட ஒரு சிறிய செய்தி. இதைப் படித்து சிரி. 💜",
            "உன்னை நினைக்க எந்த ஒரு சிறப்பு நாளும் தேவையில்லை. நீ எப்போதும் என் மனதில் இருக்கிறாய். 🌸",
            "உன் நாளை கொஞ்சம் அழகாக்க வேண்டும் என்றுதான் இந்தச் சிறிய செய்தி. ❤️",
            "எந்தக் காரணமும் இல்லை... உன்னை சிரிக்க வைக்க வேண்டும் என்று தோன்றியது! 💜",
            "நீ என் நினைவுக்கு வந்தாய்... அதனால் இந்தச் சிறிய மகிழ்ச்சி உனக்காக.",
            "நீ எனக்கு எவ்வளவு சிறப்பானவர் என்பதை நினைவூட்ட ஒரு சின்ன செய்தி.",
            "சாதாரண நாட்களிலும் அன்பைப் பெறத் தகுதியானவர் நீ.",
            "உன்னைச் சிறப்பாக உணர வைக்க எனக்குக் காரணம் தேவையில்லை.",
            "உன் சாதாரண நாளை அழகாக்க ஒரு சின்ன செய்தி! 🌸",
            "நீ இருப்பதாலேயே ஒருவரின் உலகம் இன்னும் அழகாக இருக்கிறது.",
            "இன்று விசேஷமான நாள் இல்லை... ஆனாலும் உன் மீது அக்கறை இருக்கிறது.",
            "எதிர்பாராத மகிழ்ச்சிக்கு நீ எப்போதும் தகுதியானவர்.",
            "காரணமே இல்லாமல் உனக்காக ஒரு சின்ன புன்னகை! 😊"
        ],
        tanglish: [
            "Nee enakku romba special nu remind panna oru chinna message. Idha padichittu smile pannu. 💜",
            "Unna ninaikka special occasion edhuvum thevai illa. Nee eppovum en mind la irukka. 🌸",
            "Un day ah konjam bright ah maathanum nu dhaan indha chinna message. ❤️",
            "Endha reason-um illa... unna smile panna vaikka thonuchu! 💜",
            "Nee en nyabagam vandha... adhanala indha small happiness unakku.",
            "Nee enakku evlo special-nu solla oru chinna message.",
            "Normal days-layum love receive panna nee deserve panra.",
            "Unna special-ah feel panna vaikka enakku reason thevai illa.",
            "Un ordinary day-ah beautiful-ah maatha oru small message! 🌸",
            "Nee irukkurathale orutharoda world innum beautiful-ah irukku.",
            "Innaiku special day illa... aana un mela care irukku.",
            "Unexpected happiness receive panna nee eppovume deserve panra.",
            "Reason illama unakku oru small smile anuppuren! 😊"
        ]
    }
};


const toneExtras = {
    sweet: {
        english: " Just a little reminder that you mean so much to me. 🌸",
        tamil: " நீ எனக்கு எவ்வளவு முக்கியமானவர் என்பதைச் சொல்ல ஒரு சின்ன நினைவூட்டல். 🌸",
        tanglish: " Nee enakku evlo mukkiyam nu solla oru chinna reminder. 🌸"
    },

    romantic: {
        english: " No matter what happens, my heart will always choose you. 💜",
        tamil: " எது நடந்தாலும் என் இதயம் தேர்ந்தெடுப்பது என்றும் உன்னைத்தான். 💜",
        tanglish: " Enna nadandhaalum en heart eppovum choose panradhu unna dhaan. 💜"
    },

    emotional: {
        english: " If my heart could speak, it would tell you how much you mean to me. 🫂",
        tamil: " என் இதயம் பேச முடிந்தால், நீ எனக்கு எவ்வளவு முக்கியம் என்று சொல்லியிருக்கும். 🫂",
        tanglish: " En heart pesa mudinja, nee enakku evlo mukkiyam nu sollirukkum. 🫂"
    },

    funny: {
        english: " Don't smile too much... you might become even more adorable! 😂",
        tamil: " அதிகமாகச் சிரிக்காதே... இன்னும் அழகாகிவிடுவாய்! 😂",
        tanglish: " Romba sirikkadha... innum cute ah maariduva! 😂"
    },

    simple: {
        english: " Just wishing you beautiful moments and endless happiness.",
        tamil: " அழகான தருணங்களும் முடிவில்லா மகிழ்ச்சியும் உனக்குக் கிடைக்கட்டும்.",
        tanglish: " Beautiful moments-um endless happiness-um unakku kidaikkattum."
    }
};


function cleanName(value) {
    return value.trim().replace(/\s+/g, " ");
}

function createMessage() {
    const sender = cleanName($("senderName").value);
    const recipient = cleanName($("recipientName").value);
    const occasion = $("occasion").value;
    const language = $("language").value;
    const tone = $("tone").value;
    const personalNote = $("personalNote").value.trim();

    const options = messages[occasion][language];
    const selected = options[Math.floor(Math.random() * options.length)];

    let message = `Dear ${recipient},\n\n${selected}`;

    message += toneExtras[tone][language];

    if (personalNote) {
        message += `\n\n${personalNote}`;
    }

    if (language === "english") {
        message += `\n\nWith love,\n${sender} 💜`;
    } else if (language === "tamil") {
        message += `\n\nஅன்புடன்,\n${sender} 💜`;
    } else {
        message += `\n\nAnbudan,\n${sender} 💜`;
    }

    return message;
}

function getThemeColors() {
    const selectedTheme = $("theme").value;
    const relationship = $("relationship").value;
    const occasion = $("occasion").value;

    const themes = {
        love: ["#f8dce9", "#d9c5f4", "#8e477e", "💕", "🌹"],
        family: ["#f8e9cc", "#d8edcf", "#557b52", "💚", "🌼"],
        friendship: ["#d9edfa", "#e8dcff", "#536f9a", "🫂", "🌸"],
        birthday: ["#ffe0d3", "#e8d9ff", "#8651a0", "🎂", "🎉"],
        nature: ["#dcefdc", "#e9f4d7", "#48764f", "🌿", "🌸"],
        elegant: ["#eee5f8", "#e4e8f2", "#65517e", "✨", "🤍"]
    };

    let theme = selectedTheme;

    if (theme === "auto") {
        if (occasion === "birthday") theme = "birthday";
        else if (relationship === "lover" || occasion === "love" || occasion === "anniversary") theme = "love";
        else if (relationship === "family" || relationship === "brother" || relationship === "sister") theme = "family";
        else if (relationship === "friend" || relationship === "bestie" || occasion === "friendship") theme = "friendship";
        else theme = "nature";
    }

    return themes[theme] || themes.elegant;
}

function roundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
}

function wrapText(context, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = text.split(/\s+/);
    let line = "";
    let lineCount = 0;

    for (let i = 0; i < words.length; i++) {
        const testLine = line ? `${line} ${words[i]}` : words[i];

        if (context.measureText(testLine).width > maxWidth && line) {
            context.fillText(line, x, y);
            line = words[i];
            y += lineHeight;
            lineCount++;

            if (lineCount >= maxLines - 1) {
                break;
            }
        } else {
            line = testLine;
        }
    }

    if (line && lineCount < maxLines) {
        context.fillText(line, x, y);
    }
}

function drawGreetingImage(message) {
    const [color1, color2, accent, symbol1, symbol2] = getThemeColors();

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Soft decorative circles
    for (let i = 0; i < 22; i++) {
        const x = (i * 173 + 75) % width;
        const y = (i * 257 + 45) % height;

        ctx.beginPath();
        ctx.arc(x, y, 12 + (i % 4) * 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.20)";
        ctx.fill();
    }

    // Main card
    ctx.fillStyle = "rgba(255,255,255,0.78)";
    roundedRect(ctx, 85, 85, 910, 910, 55);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 5;
    roundedRect(ctx, 105, 105, 870, 870, 42);
    ctx.stroke();

    const sender = cleanName($("senderName").value);
    const recipient = cleanName($("recipientName").value);
    const occasion = $("occasion").value;

    const occasionTitles = {
        love: "A MESSAGE FROM THE HEART",
        friendship: "CELEBRATING OUR FRIENDSHIP",
        birthday: "HAPPY BIRTHDAY",
        anniversary: "HAPPY ANNIVERSARY",
        sorry: "A MESSAGE FROM MY HEART",
        missyou: "SENDING YOU LOVE",
        thanks: "WITH GRATITUDE",
        congratulations: "CONGRATULATIONS",
        justbecause: "JUST FOR YOU"
    };

    // Top decoration
    ctx.textAlign = "center";
    ctx.fillStyle = accent;
    ctx.font = "56px Arial";
    ctx.fillText(symbol1, width / 2, 205);

    ctx.font = "bold 32px Arial";
    ctx.letterSpacing = "3px";
    ctx.fillText(occasionTitles[occasion] || "A SPECIAL MESSAGE", width / 2, 285);
    ctx.letterSpacing = "0px";

    // Recipient
    ctx.fillStyle = accent;
    ctx.font = "bold 62px Arial";
    wrapText(ctx, `Dear ${recipient}`, width / 2, 390, 790, 75, 2);

    // Message text
    const messageLines = message
        .split("\n")
        .filter(line => line.trim() !== "")
        .filter(line => !line.startsWith("Dear "))
        .filter(line => !line.startsWith("With love"))
        .filter(line => !line.startsWith("அன்புடன்"))
        .filter(line => !line.startsWith("Anbudan"));

    const displayMessage = messageLines.join(" ");

    ctx.fillStyle = "#443b50";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";

    wrapText(
        ctx,
        displayMessage,
        width / 2,
        510,
        760,
        55,
        7
    );

    // Bottom decoration and sender
    ctx.fillStyle = accent;
    ctx.font = "52px Arial";
    ctx.fillText(symbol2, width / 2, 850);

    ctx.font = "bold 34px Arial";
    ctx.fillText(`With love, ${sender}`, width / 2, 920);

    ctx.font = "25px Arial";
    ctx.fillStyle = accent;
    ctx.fillText("Made with HeartLink 💜", width / 2, 965);
}

function createImageBlob() {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Could not create image."));
        }, "image/png");
    });
}

async function generate() {
    currentMessage = createMessage();
    $("generatedMessage").value = currentMessage;

    drawGreetingImage(currentMessage);
    currentImageBlob = await createImageBlob();

    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    playOccasionAnimation();
    $("shareNote").textContent = "Your message and greeting image are ready.";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();


    try {
        await generate();
    } catch (error) {
        console.error(error);
        alert("Something went wrong while creating your image. Please try again.");
    }
});

$("copyButton").addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText($("generatedMessage").value);
        $("shareNote").textContent = "Message copied successfully!";
    } catch (error) {
        $("generatedMessage").select();
        document.execCommand("copy");
        $("shareNote").textContent = "Message copied.";
    }
});

$("downloadButton").addEventListener("click", () => {
    if (!currentImageBlob) return;

    const url = URL.createObjectURL(currentImageBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "HeartLink-Greeting.png";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    $("shareNote").textContent = "Your greeting image has been downloaded.";
});


$("shareButton").addEventListener("click", async () => {
    const message = $("generatedMessage").value;

    if (!currentImageBlob) {
        $("shareNote").textContent = "Please create your message first.";
        return;
    }

    // Your HeartLink website URL
    const websiteLink = "https://wishboxx.netlify.app//";

    // Message + website link
    const finalMessage =
        message +
        "\n\n💌 Create your own beautiful messages with HeartLink!\n" +
        websiteLink;

    const imageFile = new File(
        [currentImageBlob],
        "HeartLink-Greeting.png",
        { type: "image/png" }
    );

    // Share message, image and website link
    if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [imageFile] })
    ) {
        try {
            await navigator.share({
                title: "A message from HeartLink 💜",
                text: finalMessage,
                files: [imageFile]
            });

            $("shareNote").textContent =
                "Choose a supported app to share your message, image and website link.";
            return;

        } catch (error) {
            if (error.name === "AbortError") {
                $("shareNote").textContent = "Sharing cancelled.";
                return;
            }
            console.error(error);
        }
    }

    // Fallback: download image and copy message + link
    const url = URL.createObjectURL(currentImageBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "HeartLink-Greeting.png";
    document.body.appendChild(link);
    link.click();
    link.remove();

    try {
        await navigator.clipboard.writeText(finalMessage);

        $("shareNote").textContent =
            "Image downloaded and message with website link copied. Attach the image and paste the message in your chatting app.";

    } catch (error) {
        $("shareNote").textContent =
            "Image downloaded. Copy your message and website link, then attach the image in your chatting app.";
    }

    setTimeout(() => URL.revokeObjectURL(url), 60000);
});


$("regenerateButton").addEventListener("click", async () => {
    try {
        await generate();
    } catch (error) {
        console.error(error);
        alert("Could not regenerate. Please try again.");
    }
});

const topQuotes = [
    "காதல் என்பது அருகில் இருப்பது மட்டுமல்ல, எங்கு இருந்தாலும் மனதில் இருப்பது! 💜",
    "சில உறவுகளுக்கு பெயர் தேவையில்லை, உண்மையான அன்பு மட்டும் போதும்! 🫂",
    "உன்னைப் புரிந்துகொள்ளும் ஒரு இதயம் கிடைத்தால், அதுவே வாழ்க்கையின் அழகான வரம்! 💕",
    "தூரம் என்பது இடங்களுக்கு இடையில் மட்டுமே, மனங்களுக்கு இடையில் அல்ல! 🌸",
    "ஆயிரம் பேர் இருந்தாலும், மனதிற்கு நெருக்கமான சிலரே வாழ்க்கையின் பொக்கிஷம்! 💚",
    "சண்டைகள் வந்தாலும் பிரியாத உறவுதான் உண்மையான பந்தம்! 🫶"
];

let quoteIndex = 0;

setInterval(() => {
    quoteIndex = (quoteIndex + 1) % topQuotes.length;
    const quoteElement = document.getElementById("topQuote");

    if (quoteElement) {
        quoteElement.textContent = topQuotes[quoteIndex];
    }
}, 10000);

// ===================================
// HEARTLINK OCCASION ANIMATION SYSTEM
// ===================================

const occasionEffects = {
    love: {
        emojis: ["💗", "💕", "❤️", "🌹", "💖"],
        animation: "float-up"
    },

    friendship: {
        emojis: ["🫂", "😊", "💚", "⭐", "🤝"],
        animation: "pop"
    },

    birthday: {
        emojis: ["🎂", "🎈", "🎉", "🥳", "🎊"],
        animation: "fall-down"
    },

    anniversary: {
        emojis: ["💍", "💞", "❤️", "✨", "🌹"],
        animation: "drift"
    },

    sorry: {
        emojis: ["🥺", "🕊️", "💜", "🌸", "🤍"],
        animation: "fade-rise"
    },

    missyou: {
        emojis: ["🦋", "💜", "🥺", "✨", "💕"],
        animation: "drift"
    },

    thanks: {
        emojis: ["🌸", "🌼", "💚", "✨", "🙏"],
        animation: "bloom"
    },

    congratulations: {
        emojis: ["🏆", "🎉", "⭐", "🥳", "🎊"],
        animation: "burst"
    },

    justbecause: {
        emojis: ["💐", "💝", "✨", "🌷", "💗"],
        animation: "twinkle"
    }
};

let animationTimeouts = [];

function clearOccasionAnimation() {
    animationTimeouts.forEach(clearTimeout);
    animationTimeouts = [];

    const container = document.getElementById("occasionAnimation");

    if (container) {
        container.innerHTML = "";
    }
}

function playOccasionAnimation() {
    const container = document.getElementById("occasionAnimation");
    const occasion = document.getElementById("occasion")?.value;

    if (!container || !occasion) return;

    clearOccasionAnimation();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const effect = occasionEffects[occasion];

    if (!effect) return;

    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");

        const randomEmoji =
            effect.emojis[
            Math.floor(Math.random() * effect.emojis.length)
            ];

        particle.className =
            `animation-particle ${effect.animation}`;

        particle.textContent = randomEmoji;

        particle.style.left = `${Math.random() * 95}%`;

        particle.style.animationDelay = `${Math.random() * 0.4}s`;
        particle.style.fontSize =
            `${22 + Math.random() * 25}px`;

        container.appendChild(particle);
    }

    const timeout = setTimeout(() => {
        container.innerHTML = "";
    }, 5500);

    animationTimeouts.push(timeout);
}

// Play when the customer changes the occasion.
document.getElementById("occasion")?.addEventListener(
    "change",
    playOccasionAnimation
);
// Change the floating heart every 1 minute
const floatingHeart = document.querySelector(".floating-heart");

const heartEmojis = [
    "💜",
    "💗",
    "💖",
    "💕",
    "❤️",
    "💚",
    "💙",
    "💝",
    "🩷",
    "💞",
    "🧡",
    "🤍",
    "💝"
];

let heartIndex = 0;

setInterval(() => {
    heartIndex = (heartIndex + 1) % heartEmojis.length;

    if (floatingHeart) {
        floatingHeart.textContent = heartEmojis[heartIndex];
    }
}, 60000);
// HEARTLINK TAMIL TYPEWRITER
// HEARTLINK FLOATING HEARTS + FADE

(function () {
    const element = document.getElementById("typingText");

    if (!element) return;

    const quotes = [
        "உங்கள் மனதில் இருப்பதை, அழகான வார்த்தைகளால் உலகிற்குச் சொல்லுங்கள். 💜",
        "எந்த உறவாக இருந்தாலும், உங்கள் உணர்வுகளுக்கு அழகான வார்த்தைகளை உருவாக்குவோம். 🌸",
        "உங்கள் எண்ணங்கள், உங்கள் உணர்வுகள்… அழகான செய்திகளாக மாறட்டும்! ✨",
        "Every feeling deserves the right words. Let HeartLink create yours. 💌",
        "Turn your thoughts into beautiful messages for every person and every occasion. 💜"
    ];

    let index = 0;

    function changeTagline() {
        element.textContent = quotes[index];

        element.style.animation = "none";
        void element.offsetWidth;
        element.style.animation = "taglineFade 1s ease";

        index = (index + 1) % quotes.length;
    }

    function createHeart() {
        const heart = document.createElement("span");

        const heartTypes = ["💜", "💗", "💕", "💖", "🩷"];

        heart.className = "floating-tagline-heart";
        heart.textContent = heartTypes[
            Math.floor(Math.random() * heartTypes.length)
        ];

        heart.style.left = (20 + Math.random() * 60) + "%";
        heart.style.top = "10px";
        heart.style.fontSize = "16px";

        element.parentElement.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }

    changeTagline();

    setInterval(changeTagline, 4000);
    setInterval(createHeart, 800);
})();
