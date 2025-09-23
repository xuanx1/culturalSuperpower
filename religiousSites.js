// Comprehensive Religious Sites Database for India
const religiousSites = [
    // Major Hindu Temples
    {
        id: 1,
        name: "Kedarnath Temple",
        religion: "hindu",
        state: "Uttarakhand",
        coordinates: [30.7346, 79.0669],
        significance: "One of the 12 Jyotirlingas dedicated to Lord Shiva",
        description: "Located at an altitude of 3,583 meters, Kedarnath is one of the most sacred Hindu temples dedicated to Lord Shiva. It's part of the Char Dham Yatra and attracts millions of pilgrims annually.",
        bestTimeToVisit: "May to October",
        bestMonths: [5, 6, 7, 8, 9, 10],
        photos: [
            {
                url: "https://images.unsplash.com/photo-1582647620303-6b830c1253b5?ixlib=rb-4.0.3&w=800",
                caption: "Kedarnath Temple amidst snow-capped mountains",
                credit: "Unsplash"
            },
            {
                url: "https://images.unsplash.com/photo-1508252566135-b6b0cce29df1?ixlib=rb-4.0.3&w=800",
                caption: "Pilgrims trekking to Kedarnath",
                credit: "Unsplash"
            }
        ],
        festivals: [
            {
                name: "Kedarnath Opening (Akshaya Tritiya)",
                date: "2026-04-28",
                description: "Temple opens for pilgrims after winter closure",
                rarity: "annual"
            },
            {
                name: "Maha Shivaratri",
                date: "2026-02-17",
                description: "Grand celebration dedicated to Lord Shiva",
                rarity: "annual"
            },
            {
                name: "Kedarnath Reconstruction Anniversary",
                date: "2026-06-16",
                description: "Commemorating the temple's reconstruction after the 2013 floods",
                rarity: "annual"
            }
        ],
        travelTips: "Temple remains closed from November to April due to heavy snowfall. Helicopter services available from Phata and Guptkashi.",
        nearestAirport: "Jolly Grant Airport, Dehradun (239 km)",
        nearestRailway: "Rishikesh Railway Station (221 km)"
    },
    {
        id: 2,
        name: "Vaishno Devi Temple",
        religion: "hindu",
        state: "Jammu and Kashmir",
        coordinates: [33.0304, 74.9495],
        significance: "Sacred shrine of Goddess Vaishno Devi",
        description: "One of the most visited Hindu temples in India, dedicated to Goddess Vaishno Devi. The temple is located in the Trikuta Mountains at an altitude of 5,200 feet.",
        bestTimeToVisit: "March to October",
        bestMonths: [3, 4, 5, 6, 7, 8, 9, 10],
        photos: [
            {
                url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&w=800",
                caption: "Vaishno Devi Temple entrance",
                credit: "Unsplash"
            },
            {
                url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=800",
                caption: "Pilgrims on the trek to Vaishno Devi",
                credit: "Unsplash"
            }
        ],
        festivals: [
            {
                name: "Navratri",
                date: "2026-03-22",
                description: "Nine-day festival celebrating the Divine Mother",
                rarity: "biannual"
            },
            {
                name: "Diwali",
                date: "2025-10-31",
                description: "Festival of lights with special prayers",
                rarity: "annual"
            },
            {
                name: "Chandi Havan",
                date: "2026-10-15",
                description: "Special fire ritual performed during Navratri",
                rarity: "biannual"
            }
        ],
        travelTips: "14 km trek from Katra. Helicopter and ponies available. Online registration recommended.",
        nearestAirport: "Jammu Airport (48 km from Katra)",
        nearestRailway: "Jammu Tawi Railway Station (42 km from Katra)"
    },
    {
        id: 3,
        name: "Tirupati Balaji Temple",
        religion: "hindu",
        state: "Andhra Pradesh",
        coordinates: [13.6288, 79.4192],
        significance: "One of the richest temples in the world dedicated to Lord Venkateswara",
        description: "Located on the Tirumala Hills, this temple is dedicated to Lord Venkateswara (Balaji). It's one of the most visited religious sites in the world.",
        bestTimeToVisit: "September to March",
        bestMonths: [9, 10, 11, 12, 1, 2, 3],
        photos: [
            {
                url: "https://images.unsplash.com/photo-1582646956797-8d8c2b8c5e7a?ixlib=rb-4.0.3&w=800",
                caption: "Golden temple architecture of Tirupati",
                credit: "Unsplash"
            },
            {
                url: "https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-4.0.3&w=800",
                caption: "Devotees queuing for darshan",
                credit: "Unsplash"
            }
        ],
        festivals: [
            {
                name: "Brahmotsavam",
                date: "2026-09-15",
                description: "Annual festival lasting 9 days with grand celebrations and processions",
                rarity: "annual",
                specialNote: "Most important festival with elaborate rathotsavam (chariot procession)"
            },
            {
                name: "Vaikunta Ekadashi",
                date: "2025-12-11",
                description: "Most auspicious day at Tirupati when Vaikunta Dwaram opens",
                rarity: "annual"
            },
            {
                name: "Srivari Teppotsavam",
                date: "2026-02-20",
                description: "Float festival where deity is taken on decorated boats",
                rarity: "annual"
            }
        ],
        travelTips: "Online booking mandatory for darshan. Free queue available but takes 12-24 hours. Special entry tickets reduce waiting time.",
        nearestAirport: "Tirupati Airport (15 km)",
        nearestRailway: "Tirupati Railway Station (22 km)"
    },
    {
        id: 4,
        name: "Jagannath Temple, Puri",
        religion: "hindu",
        state: "Odisha",
        coordinates: [19.8135, 85.8312],
        significance: "One of the Char Dham pilgrimage sites dedicated to Lord Jagannath",
        description: "Famous for the annual Rath Yatra (Chariot Festival), this 12th-century temple is dedicated to Lord Jagannath, an incarnation of Lord Vishnu.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Rath Yatra",
                date: "2026-06-23",
                description: "World-famous chariot festival with millions of devotees"
            },
            {
                name: "Snana Yatra",
                date: "2026-06-08",
                description: "Bathing festival of Lord Jagannath"
            }
        ],
        travelTips: "Non-Hindus are not allowed inside the main temple. Rath Yatra is the best time to visit for the grand celebrations.",
        nearestAirport: "Biju Patnaik International Airport, Bhubaneswar (60 km)",
        nearestRailway: "Puri Railway Station (2 km)"
    },
    {
        id: 5,
        name: "Somnath Temple",
        religion: "hindu",
        state: "Gujarat",
        coordinates: [20.8880, 70.4017],
        significance: "First among the 12 Jyotirlinga shrines of Shiva",
        description: "Known as the 'Shrine Eternal', Somnath Temple has been destroyed and rebuilt several times. It's the first Jyotirlinga mentioned in Hindu scriptures.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Kartik Purnima",
                date: "2025-11-15",
                description: "Major festival with special prayers and celebrations"
            },
            {
                name: "Maha Shivaratri",
                date: "2026-02-17",
                description: "Grand celebration for Lord Shiva"
            }
        ],
        travelTips: "Beautiful sound and light show every evening. The temple faces the Arabian Sea offering stunning sunset views.",
        nearestAirport: "Diu Airport (63 km)",
        nearestRailway: "Somnath Railway Station (1 km)"
    },

    // Major Buddhist Sites
    {
        id: 6,
        name: "Bodh Gaya",
        religion: "buddhist",
        state: "Bihar",
        coordinates: [24.6955, 84.9914],
        significance: "Place where Buddha attained enlightenment",
        description: "The most sacred site for Buddhists worldwide, where Prince Siddhartha attained enlightenment under the Bodhi Tree and became Buddha.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Buddha Purnima",
                date: "2026-05-26",
                description: "Celebration of Buddha's birth, enlightenment, and death"
            },
            {
                name: "Bodhi Day",
                date: "2025-12-08",
                description: "Commemorates Buddha's enlightenment"
            }
        ],
        travelTips: "Visit the Mahabodhi Temple complex early morning for peaceful meditation. Many international Buddhist temples and monasteries nearby.",
        nearestAirport: "Gaya Airport (17 km)",
        nearestRailway: "Gaya Junction (17 km)"
    },
    {
        id: 7,
        name: "Sarnath",
        religion: "buddhist",
        state: "Uttar Pradesh",
        coordinates: [25.3781, 83.0077],
        significance: "Place where Buddha delivered his first sermon",
        description: "One of the four most sacred Buddhist sites, where Buddha gave his first sermon after attaining enlightenment, marking the beginning of Buddhism.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Buddha Purnima",
                date: "2026-05-26",
                description: "Grand celebration with international participation"
            },
            {
                name: "Dhamma Chakra Day",
                date: "2026-07-23",
                description: "Commemorates Buddha's first sermon"
            }
        ],
        travelTips: "Visit the Dhamek Stupa and Archaeological Museum. The Mulagandha Kuti Vihar has beautiful frescoes depicting Buddha's life.",
        nearestAirport: "Lal Bahadur Shastri Airport, Varanasi (13 km)",
        nearestRailway: "Varanasi Junction (13 km)"
    },
    {
        id: 8,
        name: "Dharamshala (McLeod Ganj)",
        religion: "buddhist",
        state: "Himachal Pradesh",
        coordinates: [32.2432, 76.3200],
        significance: "Residence of the 14th Dalai Lama",
        description: "Known as 'Little Lhasa', this hill station is the residence of the Dalai Lama and houses the Tibetan government-in-exile.",
        bestTimeToVisit: "March to June, September to November",
        bestMonths: [3, 4, 5, 6, 9, 10, 11],
        festivals: [
            {
                name: "Dalai Lama's Birthday",
                date: "2026-07-06",
                description: "Celebration of the Dalai Lama's birthday"
            },
            {
                name: "Losar (Tibetan New Year)",
                date: "2026-02-21",
                description: "Tibetan New Year celebrations"
            }
        ],
        travelTips: "Visit the Namgyal Monastery and Tsuglagkhang Complex. Attend teachings by the Dalai Lama when available (check schedule).",
        nearestAirport: "Gaggal Airport, Kangra (20 km)",
        nearestRailway: "Pathankot Railway Station (90 km)"
    },

    // Major Sikh Sites
    {
        id: 9,
        name: "Golden Temple (Harmandir Sahib)",
        religion: "sikh",
        state: "Punjab",
        coordinates: [31.6200, 74.8765],
        significance: "Holiest Gurdwara and spiritual center of Sikhism",
        description: "The most sacred Sikh temple, known for its golden dome and beautiful architecture. It serves free meals to over 100,000 visitors daily.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        photos: [
            {
                url: "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-4.0.3&w=800",
                caption: "Golden Temple reflecting in the sacred pool",
                credit: "Unsplash"
            },
            {
                url: "https://images.unsplash.com/photo-1566636791755-e80c17e95fbc?ixlib=rb-4.0.3&w=800",
                caption: "Evening prayers at the Golden Temple",
                credit: "Unsplash"
            },
            {
                url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&w=800",
                caption: "Langar (community kitchen) serving thousands",
                credit: "Unsplash"
            }
        ],
        festivals: [
            {
                name: "Guru Nanak Jayanti",
                date: "2025-11-15",
                description: "Birthday celebration of Guru Nanak, founder of Sikhism",
                rarity: "annual"
            },
            {
                name: "Baisakhi",
                date: "2026-04-14",
                description: "Sikh New Year and harvest festival, also commemorates formation of Khalsa",
                rarity: "annual",
                specialNote: "Celebrates the formation of Khalsa by Guru Gobind Singh in 1699"
            },
            {
                name: "Guru Gobind Singh Jayanti",
                date: "2026-01-17",
                description: "Birthday of the tenth Sikh Guru",
                rarity: "annual"
            },
            {
                name: "Martyrdom Day of Guru Arjan Dev",
                date: "2026-06-16",
                description: "Commemorating the sacrifice of the fifth Sikh Guru",
                rarity: "annual"
            },
            {
                name: "Diwali (Sikh)",
                date: "2025-10-31",
                description: "Celebrates release of Guru Hargobind from prison",
                rarity: "annual"
            }
        ],
        travelTips: "Head covering mandatory. Free accommodation available in the complex. Visit during early morning or evening for magical views. Experience the community kitchen (langar).",
        nearestAirport: "Sri Guru Ram Dass Jee International Airport (11 km)",
        nearestRailway: "Amritsar Junction (2 km)"
    },
    {
        id: 10,
        name: "Gurdwara Bangla Sahib",
        religion: "sikh",
        state: "Delhi",
        coordinates: [28.6242, 77.2085],
        significance: "Historic Gurdwara associated with Guru Har Krishan",
        description: "One of the most prominent Sikh temples in Delhi, known for its stunning architecture and the sacred pond (Sarovar).",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Guru Har Krishan Jayanti",
                date: "2026-07-23",
                description: "Birthday of the eighth Sikh Guru"
            },
            {
                name: "Parkash Utsav",
                date: "2026-04-14",
                description: "Birth anniversary celebrations"
            }
        ],
        travelTips: "Located in central Delhi near Connaught Place. Free community kitchen (langar) serves meals throughout the day.",
        nearestAirport: "Indira Gandhi International Airport (15 km)",
        nearestRailway: "New Delhi Railway Station (3 km)"
    },

    // Major Jain Sites
    {
        id: 11,
        name: "Dilwara Temples, Mount Abu",
        religion: "jain",
        state: "Rajasthan",
        coordinates: [24.5926, 72.7156],
        significance: "Finest examples of Jain architecture",
        description: "A group of five marble temples built between 11th and 13th centuries, renowned for their extraordinary marble carvings and architectural brilliance.",
        bestTimeToVisit: "November to March",
        bestMonths: [11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Mahavir Jayanti",
                date: "2026-04-06",
                description: "Birthday of Lord Mahavira, 24th Tirthankara"
            },
            {
                name: "Paryushan Parva",
                date: "2026-08-29",
                description: "Most important Jain festival lasting 8 days"
            }
        ],
        travelTips: "Photography strictly prohibited inside temples. Dress modestly and remove leather items before entering.",
        nearestAirport: "Udaipur Airport (185 km)",
        nearestRailway: "Abu Road Railway Station (28 km)"
    },
    {
        id: 12,
        name: "Shravanabelagola",
        religion: "jain",
        state: "Karnataka",
        coordinates: [12.8581, 76.4869],
        significance: "Site of the massive Gommateshvara statue",
        description: "Home to the 57-foot tall monolithic statue of Gommateshvara (Bahubali), one of the most important Jain pilgrimage destinations.",
        bestTimeToVisit: "October to February",
        bestMonths: [10, 11, 12, 1, 2],
        photos: [
            {
                url: "https://images.unsplash.com/photo-1582021926004-9b9b5c8d7c3e?ixlib=rb-4.0.3&w=800",
                caption: "Magnificent Gommateshvara statue",
                credit: "Unsplash"
            },
            {
                url: "https://images.unsplash.com/photo-1566996268434-ed4c46f3a8e8?ixlib=rb-4.0.3&w=800",
                caption: "Mahamastakabhisheka ceremony with devotees",
                credit: "Unsplash"
            }
        ],
        festivals: [
            {
                name: "Mahamastakabhisheka",
                date: "2030-02-17",
                description: "Grand festival held once every 12 years where the 57-foot statue is anointed with precious substances including milk, ghee, and gold",
                rarity: "every_12_years",
                specialNote: "World's grandest Jain celebration - Last held in 2018, next in 2030"
            },
            {
                name: "Mahavir Jayanti",
                date: "2026-04-06",
                description: "Celebration of Lord Mahavira's birth",
                rarity: "annual"
            },
            {
                name: "Paryushan Parva",
                date: "2026-08-29",
                description: "Eight-day Jain festival of forgiveness and purification",
                rarity: "annual"
            }
        ],
        travelTips: "Climb 614 steps to reach the top. The next Mahamastakabhisheka is in 2030, attracting millions of devotees. Special scaffolding is erected for the ceremony.",
        nearestAirport: "Kempegowda International Airport, Bangalore (158 km)",
        nearestRailway: "Hassan Railway Station (51 km)"
    },

    // Major Islamic Sites
    {
        id: 13,
        name: "Jama Masjid, Delhi",
        religion: "islamic",
        state: "Delhi",
        coordinates: [28.6507, 77.2334],
        significance: "Largest mosque in India",
        description: "Built by Mughal Emperor Shah Jahan, this magnificent mosque can accommodate 25,000 worshippers and is one of India's largest mosques.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Eid ul-Fitr",
                date: "2026-04-01",
                description: "Festival marking the end of Ramadan"
            },
            {
                name: "Eid ul-Adha",
                date: "2026-06-07",
                description: "Festival of Sacrifice"
            }
        ],
        travelTips: "Dress modestly and remove shoes before entering. Non-Muslims welcome outside prayer times. Beautiful view from the minaret.",
        nearestAirport: "Indira Gandhi International Airport (20 km)",
        nearestRailway: "Old Delhi Railway Station (1 km)"
    },
    {
        id: 14,
        name: "Ajmer Sharif Dargah",
        religion: "islamic",
        state: "Rajasthan",
        coordinates: [26.4499, 74.6399],
        significance: "Shrine of Sufi saint Moinuddin Chishti",
        description: "One of the most important pilgrimage sites for Muslims, the dargah of Hazrat Khwaja Moinuddin Chishti attracts people of all faiths.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Urs Festival",
                date: "2026-03-15",
                description: "Annual death anniversary celebration of the saint"
            },
            {
                name: "Eid Milad-un-Nabi",
                date: "2025-09-05",
                description: "Birthday of Prophet Muhammad"
            }
        ],
        travelTips: "People of all faiths welcome. Cover your head and remove shoes before entering. Famous for qawwali performances.",
        nearestAirport: "Jaipur International Airport (135 km)",
        nearestRailway: "Ajmer Junction (2 km)"
    },

    // Major Christian Sites
    {
        id: 15,
        name: "Basilica of Bom Jesus, Goa",
        religion: "christian",
        state: "Goa",
        coordinates: [15.5007, 73.9115],
        significance: "Contains mortal remains of St. Francis Xavier",
        description: "A UNESCO World Heritage Site, this 16th-century church houses the mortal remains of St. Francis Xavier, patron saint of Goa.",
        bestTimeToVisit: "November to February",
        bestMonths: [11, 12, 1, 2],
        festivals: [
            {
                name: "Feast of St. Francis Xavier",
                date: "2025-12-03",
                description: "Annual celebration honoring the patron saint"
            },
            {
                name: "Christmas",
                date: "2025-12-25",
                description: "Grand Christmas celebrations"
            }
        ],
        travelTips: "The body of St. Francis Xavier is displayed every 10 years (next in 2024). Visit early morning to avoid crowds.",
        nearestAirport: "Dabolim Airport (29 km)",
        nearestRailway: "Margao Railway Station (9 km)"
    },
    {
        id: 16,
        name: "St. Thomas Cathedral, Chennai",
        religion: "christian",
        state: "Tamil Nadu",
        coordinates: [13.0478, 80.2773],
        significance: "Built over tomb of St. Thomas the Apostle",
        description: "One of the oldest churches in India, built over the tomb of St. Thomas the Apostle who brought Christianity to India.",
        bestTimeToVisit: "November to February",
        bestMonths: [11, 12, 1, 2],
        festivals: [
            {
                name: "Feast of St. Thomas",
                date: "2026-07-03",
                description: "Annual feast celebrating St. Thomas the Apostle"
            },
            {
                name: "Christmas",
                date: "2025-12-25",
                description: "Christmas celebrations"
            }
        ],
        travelTips: "The church has a beautiful Gothic architecture. The museum contains artifacts related to St. Thomas.",
        nearestAirport: "Chennai International Airport (16 km)",
        nearestRailway: "Chennai Central Railway Station (8 km)"
    },

    // Additional Major Sites
    {
        id: 17,
        name: "Kashi Vishwanath Temple, Varanasi",
        religion: "hindu",
        state: "Uttar Pradesh",
        coordinates: [25.3176, 83.0099],
        significance: "One of the 12 Jyotirlingas, sacred to Lord Shiva",
        description: "One of the holiest Hindu temples, dedicated to Lord Shiva. Located in Varanasi, the spiritual capital of India.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Maha Shivaratri",
                date: "2026-02-17",
                description: "Most important festival celebrating Lord Shiva"
            },
            {
                name: "Kartik Purnima",
                date: "2025-11-15",
                description: "Holy month celebrations with special prayers"
            }
        ],
        travelTips: "Temple area can be very crowded. Early morning visit recommended. Security checks mandatory.",
        nearestAirport: "Lal Bahadur Shastri Airport (25 km)",
        nearestRailway: "Varanasi Junction (5 km)"
    },
    {
        id: 18,
        name: "Meenakshi Temple, Madurai",
        religion: "hindu",
        state: "Tamil Nadu",
        coordinates: [9.9195, 78.1194],
        significance: "Historic temple dedicated to Goddess Meenakshi and Lord Sundareshwar",
        description: "A historic Hindu temple with stunning Dravidian architecture, featuring 14 colorful gopurams (towers) and intricate sculptures.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Meenakshi Thirukalyanam",
                date: "2026-04-25",
                description: "Annual celebration of the divine marriage of Meenakshi and Sundareshwar"
            },
            {
                name: "Float Festival",
                date: "2026-01-20",
                description: "Beautiful festival with deities on decorated floats"
            }
        ],
        travelTips: "Temple is open from 5 AM to 12:30 PM and 4 PM to 9:30 PM. Don't miss the evening prayer ceremony.",
        nearestAirport: "Madurai Airport (12 km)",
        nearestRailway: "Madurai Junction (2 km)"
    },
    {
        id: 19,
        name: "Sun Temple, Konark",
        religion: "hindu",
        state: "Odisha",
        coordinates: [19.8876, 86.0943],
        significance: "UNESCO World Heritage Site dedicated to Sun God",
        description: "A 13th-century temple dedicated to the Sun God, designed as a giant stone chariot with 24 wheels, representing the hours of the day.",
        bestTimeToVisit: "October to February",
        bestMonths: [10, 11, 12, 1, 2],
        festivals: [
            {
                name: "Konark Dance Festival",
                date: "2025-12-01",
                description: "Annual classical dance festival against the temple backdrop"
            },
            {
                name: "Magha Saptami",
                date: "2026-01-25",
                description: "Sun worship festival with traditional rituals"
            }
        ],
        travelTips: "Best viewed during sunrise and sunset. Archaeological museum nearby provides historical context.",
        nearestAirport: "Biju Patnaik International Airport, Bhubaneswar (65 km)",
        nearestRailway: "Puri Railway Station (35 km)"
    },
    {
        id: 20,
        name: "Lotus Temple, Delhi",
        religion: "bahai",
        state: "Delhi",
        coordinates: [28.5535, 77.2588],
        significance: "Bahá'í House of Worship known for its lotus-like architecture",
        description: "A Bahá'í House of Worship notable for its flower-like design. Open to people of all religions for meditation and prayer.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Ridvan Festival",
                date: "2026-04-21",
                description: "Most important Bahá'í festival commemorating Bahá'u'lláh's declaration"
            },
            {
                name: "World Religion Day",
                date: "2026-01-18",
                description: "Celebration of unity among all religions"
            }
        ],
        travelTips: "Maintain complete silence inside. No photography allowed inside the prayer hall. Beautiful gardens surrounding the temple.",
        nearestAirport: "Indira Gandhi International Airport (18 km)",
        nearestRailway: "New Delhi Railway Station (10 km)"
    },
    
    // Kumbh Mela Sites - Added for rare decadal festivals
    {
        id: 21,
        name: "Allahabad (Prayagraj) - Kumbh Mela",
        religion: "hindu",
        state: "Uttar Pradesh",
        coordinates: [25.4358, 81.8463],
        significance: "Site of the Maha Kumbh Mela, world's largest religious gathering",
        description: "The confluence of Ganga, Yamuna, and mythical Saraswati rivers. Hosts the Maha Kumbh Mela every 12 years, attracting over 100 million pilgrims.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        photos: [
            {
                url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=800",
                caption: "Massive gathering at Kumbh Mela",
                credit: "Unsplash"
            },
            {
                url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&w=800",
                caption: "Sadhus at the sacred confluence",
                credit: "Unsplash"
            }
        ],
        festivals: [
            {
                name: "Maha Kumbh Mela",
                date: "2037-01-15",
                description: "Once in 144 years - the rarest and largest religious gathering on Earth",
                rarity: "every_144_years",
                specialNote: "Next occurrence: 2037 (once every 144 years)"
            },
            {
                name: "Purna Kumbh Mela",
                date: "2025-01-29",
                description: "Complete Kumbh Mela held every 12 years",
                rarity: "every_12_years",
                specialNote: "Major event attracting 50+ million pilgrims"
            },
            {
                name: "Ardh Kumbh Mela",
                date: "2031-01-20",
                description: "Half Kumbh Mela held every 6 years",
                rarity: "every_6_years"
            },
            {
                name: "Mauni Amavasya",
                date: "2026-01-20",
                description: "Most auspicious bathing day during Kumbh",
                rarity: "annual"
            }
        ],
        travelTips: "During Kumbh Mela, accommodation should be booked months in advance. Temporary tent cities are set up. Follow crowd management guidelines strictly.",
        nearestAirport: "Bamrauli Airport, Allahabad (12 km)",
        nearestRailway: "Allahabad Junction (8 km)"
    },

    // Additional Hindu Sites
    {
        id: 22,
        name: "Badrinath Temple",
        religion: "hindu",
        state: "Uttarakhand",
        coordinates: [30.7433, 79.4938],
        significance: "One of Char Dham pilgrimage sites dedicated to Lord Vishnu",
        description: "Located at an altitude of 3,133 meters, this temple is one of the holiest Hindu shrines and part of the Char Dham Yatra.",
        bestTimeToVisit: "May to October",
        bestMonths: [5, 6, 7, 8, 9, 10],
        festivals: [
            {
                name: "Badri-Kedar Festival",
                date: "2026-06-15",
                description: "Joint celebration of Badrinath and Kedarnath opening",
                rarity: "annual"
            },
            {
                name: "Mata Murti Ka Mela",
                date: "2026-09-08",
                description: "Celebrates the descent of River Ganga to Earth",
                rarity: "annual"
            }
        ],
        travelTips: "Temple opens from May to November. Helicopter services available from Dehradun.",
        nearestAirport: "Jolly Grant Airport, Dehradun (317 km)",
        nearestRailway: "Rishikesh Railway Station (295 km)"
    },
    {
        id: 23,
        name: "Gangotri Temple",
        religion: "hindu",
        state: "Uttarakhand",
        coordinates: [30.9945, 78.9400],
        significance: "Source of River Ganga, one of Char Dham sites",
        description: "Located at the origin of River Ganga, this temple is dedicated to Goddess Ganga and is part of the sacred Char Dham Yatra.",
        bestTimeToVisit: "May to October",
        bestMonths: [5, 6, 7, 8, 9, 10],
        festivals: [
            {
                name: "Ganga Dussehra",
                date: "2026-06-05",
                description: "Celebrates the descent of Ganga from heaven",
                rarity: "annual"
            },
            {
                name: "Gangotri Temple Opening",
                date: "2026-05-03",
                description: "Annual opening ceremony after winter closure",
                rarity: "annual"
            }
        ],
        travelTips: "Temple closes in winter due to heavy snowfall. Trek to Gaumukh glacier source is popular.",
        nearestAirport: "Jolly Grant Airport, Dehradun (226 km)",
        nearestRailway: "Rishikesh Railway Station (220 km)"
    },
    {
        id: 24,
        name: "Yamunotri Temple",
        religion: "hindu",
        state: "Uttarakhand",
        coordinates: [30.8833, 78.4500],
        significance: "Source of River Yamuna, one of Char Dham sites",
        description: "Dedicated to Goddess Yamuna, this temple marks the source of River Yamuna and completes the Char Dham Yatra circuit.",
        bestTimeToVisit: "May to October",
        bestMonths: [5, 6, 7, 8, 9, 10],
        festivals: [
            {
                name: "Yamuna Jayanti",
                date: "2026-04-20",
                description: "Birthday celebration of Goddess Yamuna",
                rarity: "annual"
            }
        ],
        travelTips: "6 km trek from Janki Chatti. Hot springs (Surya Kund) nearby for cooking rice and potatoes.",
        nearestAirport: "Jolly Grant Airport, Dehradun (210 km)",
        nearestRailway: "Rishikesh Railway Station (185 km)"
    },
    {
        id: 25,
        name: "Dwarka Temple",
        religion: "hindu",
        state: "Gujarat",
        coordinates: [22.2394, 68.9678],
        significance: "One of Char Dham sites, Krishna's ancient kingdom",
        description: "Believed to be the ancient kingdom of Lord Krishna, this temple is one of the most sacred pilgrimage sites and part of Char Dham.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Janmashtami",
                date: "2026-08-14",
                description: "Celebration of Lord Krishna's birthday",
                rarity: "annual"
            },
            {
                name: "Sharad Purnima",
                date: "2025-10-16",
                description: "Full moon festival with special prayers",
                rarity: "annual"
            }
        ],
        travelTips: "Visit Bet Dwarka island by boat. Sunset point offers beautiful Arabian Sea views.",
        nearestAirport: "Jamnagar Airport (130 km)",
        nearestRailway: "Dwarka Railway Station (2 km)"
    },
    {
        id: 26,
        name: "Rameswaram Temple",
        religion: "hindu",
        state: "Tamil Nadu",
        coordinates: [9.2876, 79.3129],
        significance: "One of Char Dham sites and 12 Jyotirlingas",
        description: "Famous for its magnificent architecture and long corridors, this temple is where Lord Rama worshipped Lord Shiva before crossing to Lanka.",
        bestTimeToVisit: "October to April",
        bestMonths: [10, 11, 12, 1, 2, 3, 4],
        festivals: [
            {
                name: "Maha Shivaratri",
                date: "2026-02-17",
                description: "Grand celebration with special abhishek ceremonies",
                rarity: "annual"
            },
            {
                name: "Ram Navami",
                date: "2026-04-06",
                description: "Birthday celebration of Lord Rama",
                rarity: "annual"
            }
        ],
        travelTips: "Don't miss the 22 sacred wells. Pamban Bridge offers scenic train journey views.",
        nearestAirport: "Madurai Airport (174 km)",
        nearestRailway: "Rameswaram Railway Station (2 km)"
    },
    {
        id: 27,
        name: "Sabarimala Temple",
        religion: "hindu",
        state: "Kerala",
        coordinates: [9.4346, 77.0847],
        significance: "Sacred shrine of Lord Ayyappa",
        description: "One of the most visited pilgrimage sites in India, famous for its unique traditions and the 41-day vratham (penance) observed by devotees.",
        bestTimeToVisit: "November to January",
        bestMonths: [11, 12, 1],
        festivals: [
            {
                name: "Mandala Pooja",
                date: "2025-12-26",
                description: "Major festival marking the end of 41-day pilgrimage season",
                rarity: "annual"
            },
            {
                name: "Makaravilakku",
                date: "2026-01-14",
                description: "Sacred light appears on Makara Sankranti",
                rarity: "annual"
            }
        ],
        travelTips: "Only male devotees and women above 50 or below 10 allowed. 41-day vratham required before visit.",
        nearestAirport: "Trivandrum Airport (160 km)",
        nearestRailway: "Chengannur Railway Station (65 km)"
    },
    {
        id: 28,
        name: "Khajuraho Temples",
        religion: "hindu",
        state: "Madhya Pradesh",
        coordinates: [24.8318, 79.9199],
        significance: "UNESCO World Heritage Site with exquisite temple art",
        description: "Famous for their nagara-style architectural symbolism and erotic sculptures, these 10th-century temples represent the pinnacle of Indian art.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Khajuraho Dance Festival",
                date: "2026-02-20",
                description: "Classical dance festival against temple backdrop",
                rarity: "annual"
            },
            {
                name: "Shivaratri Festival",
                date: "2026-02-17",
                description: "Grand celebration at Matangeshwar Temple",
                rarity: "annual"
            }
        ],
        travelTips: "Light and sound show every evening. Western and Eastern temple groups are must-visit.",
        nearestAirport: "Khajuraho Airport (5 km)",
        nearestRailway: "Khajuraho Railway Station (8 km)"
    },
    {
        id: 29,
        name: "Shirdi Sai Baba Temple",
        religion: "hindu",
        state: "Maharashtra",
        coordinates: [19.7645, 74.4760],
        significance: "Samadhi shrine of Sai Baba of Shirdi",
        description: "One of the most visited pilgrimage sites in India, dedicated to Sai Baba who lived here and preached unity of all religions.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Ram Navami",
                date: "2026-04-06",
                description: "Sai Baba's most important festival",
                rarity: "annual"
            },
            {
                name: "Guru Purnima",
                date: "2026-07-15",
                description: "Teacher worship festival",
                rarity: "annual"
            },
            {
                name: "Vijayadashami",
                date: "2025-10-12",
                description: "Celebrates Sai Baba's first arrival in Shirdi",
                rarity: "annual"
            }
        ],
        travelTips: "Online darshan booking recommended. Visit Dwarkamai and Chavadi for complete experience.",
        nearestAirport: "Aurangabad Airport (118 km)",
        nearestRailway: "Sainagar Shirdi Railway Station (2 km)"
    },

    // Additional Buddhist Sites
    {
        id: 30,
        name: "Kushinagar",
        religion: "buddhist",
        state: "Uttar Pradesh",
        coordinates: [26.7382, 83.8897],
        significance: "Place where Buddha attained Mahaparinirvana",
        description: "One of the four most sacred Buddhist sites where Buddha died and attained Mahaparinirvana (final nirvana).",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Buddha Purnima",
                date: "2026-05-26",
                description: "Major celebration of Buddha's life events",
                rarity: "annual"
            },
            {
                name: "Buddha Mahaparinirvana Day",
                date: "2026-02-15",
                description: "Commemorates Buddha's death anniversary",
                rarity: "annual"
            }
        ],
        travelTips: "Visit the reclining Buddha statue and Ramabhar Stupa. Many international monasteries nearby.",
        nearestAirport: "Gorakhpur Airport (50 km)",
        nearestRailway: "Kushinagar Railway Station (8 km)"
    },
    {
        id: 31,
        name: "Lumbini (Kapilavastu)",
        religion: "buddhist",
        state: "Uttar Pradesh",
        coordinates: [27.4833, 83.2333],
        significance: "Associated with Buddha's early life",
        description: "Ancient Kapilavastu kingdom where Prince Siddhartha (Buddha) spent his early years before renunciation.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Buddha Jayanti",
                date: "2026-05-26",
                description: "Celebration of Buddha's birth",
                rarity: "annual"
            }
        ],
        travelTips: "Archaeological sites and ruins of ancient Kapilavastu. Piprahwa is believed to be the exact location.",
        nearestAirport: "Gorakhpur Airport (120 km)",
        nearestRailway: "Nautanwa Railway Station (45 km)"
    },
    {
        id: 32,
        name: "Sanchi Stupa",
        religion: "buddhist",
        state: "Madhya Pradesh",
        coordinates: [23.4788, 77.7394],
        significance: "UNESCO World Heritage Site with ancient Buddhist monuments",
        description: "The Great Stupa at Sanchi is one of the oldest stone structures in India and the most important Buddhist monument.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Buddha Purnima",
                date: "2026-05-26",
                description: "Major Buddhist festival celebration",
                rarity: "annual"
            }
        ],
        travelTips: "Museum has excellent collection of Buddhist art. Best preserved Buddhist complex in India.",
        nearestAirport: "Bhopal Airport (46 km)",
        nearestRailway: "Bhopal Railway Station (46 km)"
    },
    {
        id: 33,
        name: "Tawang Monastery",
        religion: "buddhist",
        state: "Arunachal Pradesh",
        coordinates: [27.5863, 91.8709],
        significance: "Largest monastery in India and birthplace of 6th Dalai Lama",
        description: "Founded in 1680, this is the largest Buddhist monastery in India and the birthplace of the 6th Dalai Lama.",
        bestTimeToVisit: "March to October",
        bestMonths: [3, 4, 5, 6, 7, 8, 9, 10],
        festivals: [
            {
                name: "Torgya Festival",
                date: "2026-01-08",
                description: "Annual mask dance festival",
                rarity: "annual"
            },
            {
                name: "Losar",
                date: "2026-02-21",
                description: "Tibetan New Year celebration",
                rarity: "annual"
            }
        ],
        travelTips: "Inner Line Permit required for non-Arunachal residents. Stunning Himalayan views.",
        nearestAirport: "Tezpur Airport (320 km)",
        nearestRailway: "Rangapara Railway Station (350 km)"
    },

    // Additional Jain Sites
    {
        id: 34,
        name: "Palitana Temples",
        religion: "jain",
        state: "Gujarat",
        coordinates: [21.5222, 71.8258],
        significance: "Largest cluster of Jain temples on Shatrunjaya Hill",
        description: "Over 900 temples on Shatrunjaya Hill, making it the world's largest temple complex. Climb of 3,800 steps required.",
        bestTimeToVisit: "November to February",
        bestMonths: [11, 12, 1, 2],
        festivals: [
            {
                name: "Kartik Purnima",
                date: "2025-11-15",
                description: "Major Jain pilgrimage festival",
                rarity: "annual"
            },
            {
                name: "Paryushan Parva",
                date: "2026-08-29",
                description: "Most important Jain festival",
                rarity: "annual"
            }
        ],
        travelTips: "Climbing starts early morning. Food and leather items prohibited. Stay overnight not allowed on hill.",
        nearestAirport: "Bhavnagar Airport (51 km)",
        nearestRailway: "Palitana Railway Station (5 km)"
    },
    {
        id: 35,
        name: "Ranakpur Jain Temple",
        religion: "jain",
        state: "Rajasthan",
        coordinates: [25.1194, 73.4717],
        significance: "Famous for 1,444 uniquely carved pillars",
        description: "15th-century temple dedicated to Tirthankara Adinatha, famous for its intricate marble architecture and 1,444 carved pillars.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Mahavir Jayanti",
                date: "2026-04-06",
                description: "Birthday of Lord Mahavira",
                rarity: "annual"
            }
        ],
        travelTips: "Photography allowed in certain areas. Intricate marble work is best seen in sunlight.",
        nearestAirport: "Udaipur Airport (90 km)",
        nearestRailway: "Falna Railway Station (39 km)"
    },
    {
        id: 36,
        name: "Gomateshwara Temple, Karkala",
        religion: "jain",
        state: "Karnataka",
        coordinates: [13.2164, 74.9929],
        significance: "42-foot monolithic statue of Bahubali",
        description: "Second tallest monolithic statue of Gomateshwara (Bahubali) in India, carved from single granite block in 1432.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Karkala Gomateshwara Mahamastakabhisheka",
                date: "2032-02-20",
                description: "Grand anointing ceremony held every 12 years",
                rarity: "every_12_years"
            }
        ],
        travelTips: "108 steps to reach the statue. Peaceful location with scenic Western Ghats views.",
        nearestAirport: "Mangalore Airport (65 km)",
        nearestRailway: "Udupi Railway Station (25 km)"
    },

    // Additional Islamic Sites
    {
        id: 37,
        name: "Fatehpur Sikri",
        religion: "islamic",
        state: "Uttar Pradesh",
        coordinates: [27.0937, 77.6615],
        significance: "UNESCO World Heritage Mughal city",
        description: "Former Mughal capital built by Emperor Akbar, featuring magnificent Indo-Islamic architecture including the famous Buland Darwaza.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Urs of Sheikh Salim Chishti",
                date: "2026-03-20",
                description: "Annual celebration at the saint's tomb",
                rarity: "annual"
            }
        ],
        travelTips: "Visit early morning to avoid crowds. Tomb of Sheikh Salim Chishti is famous for wish fulfillment.",
        nearestAirport: "Agra Airport (40 km)",
        nearestRailway: "Fatehpur Sikri Railway Station (1 km)"
    },
    {
        id: 38,
        name: "Haji Ali Dargah",
        religion: "islamic",
        state: "Maharashtra",
        coordinates: [18.9826, 72.8095],
        significance: "Famous mosque and dargah on islet in Arabian Sea",
        description: "Built in 1431, this mosque and dargah is accessible only during low tide via a narrow causeway. Famous for its Indo-Islamic architecture.",
        bestTimeToVisit: "November to February",
        bestMonths: [11, 12, 1, 2],
        festivals: [
            {
                name: "Haji Ali Urs",
                date: "2026-02-10",
                description: "Annual death anniversary celebration",
                rarity: "annual"
            }
        ],
        travelTips: "Check tide timings before visit. Beautiful sunset views from the causeway.",
        nearestAirport: "Chhatrapati Shivaji International Airport (15 km)",
        nearestRailway: "Mumbai Central Railway Station (8 km)"
    },
    {
        id: 39,
        name: "Nizamuddin Dargah",
        religion: "islamic",
        state: "Delhi",
        coordinates: [28.5933, 77.2507],
        significance: "Shrine of Sufi saint Nizamuddin Auliya",
        description: "One of the most visited Sufi shrines in the world, dedicated to the 14th-century Sufi saint Hazrat Nizamuddin Auliya.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Urs of Nizamuddin Auliya",
                date: "2026-04-15",
                description: "Annual death anniversary with qawwali performances",
                rarity: "annual"
            }
        ],
        travelTips: "Thursday evening qawwali sessions are famous. Nearby Humayun's Tomb is also worth visiting.",
        nearestAirport: "Indira Gandhi International Airport (20 km)",
        nearestRailway: "Nizamuddin Railway Station (2 km)"
    },

    // Additional Christian Sites
    {
        id: 40,
        name: "Velankanni Church",
        religion: "christian",
        state: "Tamil Nadu",
        coordinates: [10.6833, 79.8500],
        significance: "Shrine of Our Lady of Good Health",
        description: "Also known as the 'Lourdes of the East', this shrine is famous for miraculous healings and attracts millions of pilgrims annually.",
        bestTimeToVisit: "November to February",
        bestMonths: [11, 12, 1, 2],
        festivals: [
            {
                name: "Feast of Our Lady of Good Health",
                date: "2025-09-08",
                description: "Annual feast with grand processions",
                rarity: "annual"
            },
            {
                name: "Christmas Novena",
                date: "2025-12-16",
                description: "Nine-day preparation for Christmas",
                rarity: "annual"
            }
        ],
        travelTips: "Sea-facing basilica offers beautiful views. Tank with holy water believed to have healing properties.",
        nearestAirport: "Tiruchirappalli Airport (160 km)",
        nearestRailway: "Velankanni Railway Station (1 km)"
    },
    {
        id: 41,
        name: "St. Francis Church, Kochi",
        religion: "christian",
        state: "Kerala",
        coordinates: [9.9658, 76.2422],
        significance: "Oldest European church in India",
        description: "Built in 1503, this is the oldest European church in India where Vasco da Gama was originally buried before his remains were moved to Portugal.",
        bestTimeToVisit: "October to February",
        bestMonths: [10, 11, 12, 1, 2],
        festivals: [
            {
                name: "Christmas",
                date: "2025-12-25",
                description: "Christmas celebrations in historic setting",
                rarity: "annual"
            }
        ],
        travelTips: "Part of Fort Kochi heritage area. Combine with Chinese fishing nets and spice markets visit.",
        nearestAirport: "Cochin International Airport (40 km)",
        nearestRailway: "Ernakulam Junction (13 km)"
    },
    {
        id: 42,
        name: "Mount Mary Church, Mumbai",
        religion: "christian",
        state: "Maharashtra",
        coordinates: [19.0513, 72.8198],
        significance: "Famous for the annual Bandra Fair",
        description: "Built in the 16th century, this church is famous for the statue of Mother Mary and the annual Bandra Fair that attracts people of all faiths.",
        bestTimeToVisit: "September to March",
        bestMonths: [9, 10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Bandra Fair",
                date: "2025-09-08",
                description: "Week-long festival celebrating Nativity of Mary",
                rarity: "annual"
            }
        ],
        travelTips: "Located on Bandra Hill with sea views. Famous for answered prayers and offerings.",
        nearestAirport: "Chhatrapati Shivaji International Airport (8 km)",
        nearestRailway: "Bandra Railway Station (3 km)"
    },

    // Additional Sikh Sites
    {
        id: 43,
        name: "Anandpur Sahib",
        religion: "sikh",
        state: "Punjab",
        coordinates: [31.2391, 76.5022],
        significance: "Birthplace of Khalsa and city of bliss",
        description: "Founded by Guru Tegh Bahadur, this is where Guru Gobind Singh created the Khalsa in 1699. Known as the 'Holy City of Bliss'.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Hola Mohalla",
                date: "2026-03-15",
                description: "Sikh festival of martial arts and valor",
                rarity: "annual"
            },
            {
                name: "Khalsa Creation Day",
                date: "2026-04-14",
                description: "Celebrates the creation of Khalsa",
                rarity: "annual"
            }
        ],
        travelTips: "Visit Takht Sri Keshgarh Sahib and other historic gurdwaras. Hola Mohalla festival showcases martial arts.",
        nearestAirport: "Chandigarh Airport (90 km)",
        nearestRailway: "Anandpur Sahib Railway Station (5 km)"
    },
    {
        id: 44,
        name: "Hemkund Sahib",
        religion: "sikh",
        state: "Uttarakhand",
        coordinates: [30.7164, 79.6661],
        significance: "High-altitude gurdwara where Guru Gobind Singh meditated",
        description: "Located at 4,329 meters, this is one of the highest gurdwaras in the world, situated beside a glacial lake where Guru Gobind Singh is believed to have meditated.",
        bestTimeToVisit: "June to October",
        bestMonths: [6, 7, 8, 9, 10],
        festivals: [
            {
                name: "Guru Gobind Singh Jayanti",
                date: "2026-01-17",
                description: "Birthday celebration of tenth Guru",
                rarity: "annual"
            }
        ],
        travelTips: "13 km trek from Govindghat. Closes in winter due to snow. Valley of Flowers nearby.",
        nearestAirport: "Jolly Grant Airport, Dehradun (293 km)",
        nearestRailway: "Rishikesh Railway Station (273 km)"
    },
    {
        id: 45,
        name: "Patna Sahib",
        religion: "sikh",
        state: "Bihar",
        coordinates: [25.6093, 85.1376],
        significance: "Birthplace of Guru Gobind Singh",
        description: "The birthplace of the tenth Sikh Guru, Guru Gobind Singh. One of the five Takhts (seats of temporal authority) in Sikhism.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Guru Gobind Singh Jayanti",
                date: "2026-01-17",
                description: "Grand celebration of Guru's birthday at his birthplace",
                rarity: "annual"
            }
        ],
        travelTips: "Museum displays artifacts related to Guru Gobind Singh. Traditional architecture with beautiful domes.",
        nearestAirport: "Jay Prakash Narayan Airport, Patna (10 km)",
        nearestRailway: "Patna Junction (8 km)"
    },

    // More Hindu Sites
    {
        id: 46,
        name: "Konark Sun Temple",
        religion: "hindu",
        state: "Odisha",
        coordinates: [19.8876, 86.0945],
        significance: "UNESCO World Heritage Site dedicated to Sun God",
        description: "13th-century temple designed as a gigantic chariot with wheels, horses and intricate stone carvings. Famous for its architectural grandeur.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Konark Dance Festival",
                date: "2025-12-01",
                description: "Classical dance festival against temple backdrop",
                rarity: "annual"
            },
            {
                name: "Magha Saptami",
                date: "2026-02-04",
                description: "Sun worship festival with thousands of devotees",
                rarity: "annual"
            }
        ],
        travelTips: "Visit during sunrise for magical lighting. Chandrabhaga beach nearby for sunset views.",
        nearestAirport: "Biju Patnaik International Airport, Bhubaneswar (65 km)",
        nearestRailway: "Puri Railway Station (35 km)"
    },
    {
        id: 47,
        name: "Kamakhya Temple",
        religion: "hindu",
        state: "Assam",
        coordinates: [26.1664, 91.7008],
        significance: "One of 51 Shakti Peethas, temple of the goddess Kamakhya",
        description: "Ancient temple dedicated to goddess Kamakhya, one of the oldest Shakti temples in India. Famous for Tantric worship and Ambubachi Mela.",
        bestTimeToVisit: "October to April",
        bestMonths: [10, 11, 12, 1, 2, 3, 4],
        festivals: [
            {
                name: "Ambubachi Mela",
                date: "2026-06-22",
                description: "Annual fertility festival when temple remains closed for 3 days",
                rarity: "annual"
            },
            {
                name: "Durga Puja",
                date: "2025-10-10",
                description: "Major celebration of goddess Durga",
                rarity: "annual"
            }
        ],
        travelTips: "Temple closes during Ambubachi for 3 days. Panoramic views of Brahmaputra river from hilltop.",
        nearestAirport: "Lokpriya Gopinath Bordoloi International Airport, Guwahati (8 km)",
        nearestRailway: "Guwahati Railway Station (10 km)"
    },
    {
        id: 48,
        name: "Lingaraj Temple",
        religion: "hindu",
        state: "Odisha",
        coordinates: [20.2379, 85.8245],
        significance: "Largest temple in Bhubaneswar dedicated to Lord Shiva",
        description: "11th-century temple representing the culmination of Kalinga architecture. One of the most important Shiva temples in eastern India.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Shivaratri",
                date: "2026-02-17",
                description: "Grand celebration with elaborate rituals",
                rarity: "annual"
            },
            {
                name: "Ashokashtami",
                date: "2026-04-15",
                description: "Chariot festival of Lord Lingaraj",
                rarity: "annual"
            }
        ],
        travelTips: "Non-Hindus can view from platform outside. Part of temple tour including Mukteshwar and Rajarani.",
        nearestAirport: "Biju Patnaik International Airport, Bhubaneswar (5 km)",
        nearestRailway: "Bhubaneswar Railway Station (4 km)"
    },
    {
        id: 49,
        name: "Trimbakeshwar Temple",
        religion: "hindu",
        state: "Maharashtra",
        coordinates: [19.9342, 73.5282],
        significance: "One of 12 Jyotirlingas and source of river Godavari",
        description: "Sacred Jyotirlinga temple located near the source of river Godavari. Famous for its unique crown-shaped structure and Kumbh Mela venue.",
        bestTimeToVisit: "June to March",
        bestMonths: [6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Kumbh Mela",
                date: "2027-08-15",
                description: "Major Kumbh Mela held every 12 years",
                rarity: "every_12_years"
            },
            {
                name: "Shravan Monday",
                date: "2026-07-20",
                description: "Special prayers during monsoon month",
                rarity: "annual"
            }
        ],
        travelTips: "Visit Brahmagiri hill for Godavari source. Beautiful in monsoon when river is full.",
        nearestAirport: "Chhatrapati Sambhajinagar Airport (100 km)",
        nearestRailway: "Nashik Road Railway Station (28 km)"
    },
    {
        id: 50,
        name: "Madurai Meenakshi Temple",
        religion: "hindu",
        state: "Tamil Nadu",
        coordinates: [9.9195, 78.1194],
        significance: "Historic temple complex dedicated to Goddess Meenakshi",
        description: "One of India's most magnificent temple complexes with 14 colorful gopurams, intricate sculptures, and the famous Hall of Thousand Pillars.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Meenakshi Thirukalyanam",
                date: "2026-04-20",
                description: "10-day celestial wedding festival of Meenakshi and Sundareswarar",
                rarity: "annual"
            },
            {
                name: "Float Festival",
                date: "2026-01-25",
                description: "Deities taken on decorated floats in temple tank",
                rarity: "annual"
            }
        ],
        travelTips: "Visit Hall of Thousand Pillars and musical pillars. Evening aarti is spectacular.",
        nearestAirport: "Madurai Airport (12 km)",
        nearestRailway: "Madurai Junction (2 km)"
    },
    {
        id: 51,
        name: "Venkateswara Temple, Tirumala",
        religion: "hindu",
        state: "Andhra Pradesh",
        coordinates: [13.6288, 79.4192],
        significance: "World's richest temple dedicated to Lord Venkateswara",
        description: "Located on seven hills, this is the world's most visited Hindu temple and richest religious institution, famous for its wealth and laddu prasadam.",
        bestTimeToVisit: "September to March",
        bestMonths: [9, 10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Brahmotsavam",
                date: "2025-10-04",
                description: "9-day annual festival with grand processions",
                rarity: "annual"
            },
            {
                name: "Vaikunta Ekadashi",
                date: "2026-01-11",
                description: "Sacred day when Vaikunta Dwaram opens",
                rarity: "annual"
            }
        ],
        travelTips: "Book darshan tickets online. Free meals at Annadanam complex. Laddus are world-famous.",
        nearestAirport: "Tirupati Airport (15 km to Tirupati, then 22 km to Tirumala)",
        nearestRailway: "Tirupati Railway Station (22 km)"
    },

    // More Buddhist Sites
    {
        id: 52,
        name: "Hemis Monastery",
        religion: "buddhist",
        state: "Ladakh",
        coordinates: [34.0168, 77.6644],
        significance: "Largest and wealthiest monastery in Ladakh",
        description: "Founded in 1630, this Drukpa Lineage monastery is famous for its annual Hemis Festival and houses rare Buddhist artifacts including ancient thangkas.",
        bestTimeToVisit: "May to September",
        bestMonths: [5, 6, 7, 8, 9],
        festivals: [
            {
                name: "Hemis Festival",
                date: "2026-07-15",
                description: "Masked dance festival celebrating Guru Padmasambhava",
                rarity: "annual"
            }
        ],
        travelTips: "Festival features mystical Cham dances. Museum has impressive collection of Buddhist artifacts.",
        nearestAirport: "Kushok Bakula Rimpochee Airport, Leh (45 km)",
        nearestRailway: "Jammu Tawi Railway Station (434 km)"
    },
    {
        id: 53,
        name: "Rumtek Monastery",
        religion: "buddhist",
        state: "Sikkim",
        coordinates: [27.3106, 88.5661],
        significance: "Seat of Karmapa and largest monastery in Sikkim",
        description: "The Dharmachakra Centre, seat of the 16th Karmapa, is one of the most significant monasteries for the Karma Kagyu lineage of Tibetan Buddhism.",
        bestTimeToVisit: "March to May, October to December",
        bestMonths: [3, 4, 5, 10, 11, 12],
        festivals: [
            {
                name: "Losar",
                date: "2026-02-21",
                description: "Tibetan New Year with masked dances",
                rarity: "annual"
            },
            {
                name: "Buddha Jayanti",
                date: "2026-05-26",
                description: "Buddha's birthday celebration",
                rarity: "annual"
            }
        ],
        travelTips: "Golden Stupa and shrine room are highlights. Beautiful views of surrounding mountains.",
        nearestAirport: "Bagdogra Airport (125 km)",
        nearestRailway: "New Jalpaiguri Railway Station (125 km)"
    },
    {
        id: 54,
        name: "Nalanda University Ruins",
        religion: "buddhist",
        state: "Bihar",
        coordinates: [25.1358, 85.4427],
        significance: "UNESCO World Heritage ancient Buddhist university",
        description: "Ruins of the ancient Nalanda University, one of the world's first residential universities and a major seat of Buddhist learning from 5th to 12th century.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Buddha Purnima",
                date: "2026-05-26",
                description: "Buddhist festival celebration at historic site",
                rarity: "annual"
            }
        ],
        travelTips: "Visit archaeological museum. Nalanda Archaeological Site has extensive ruins of ancient classrooms and dormitories.",
        nearestAirport: "Jay Prakash Narayan Airport, Patna (95 km)",
        nearestRailway: "Rajgir Railway Station (13 km)"
    },

    // More Jain Sites
    {
        id: 55,
        name: "Mount Abu Dilwara Temples",
        religion: "jain",
        state: "Rajasthan",
        coordinates: [24.5925, 72.7156],
        significance: "Five marble temples with exquisite architecture",
        description: "Group of five marble temples built between 11th-13th centuries, renowned for their stunning use of marble and intricate carvings. Considered architectural marvels.",
        bestTimeToVisit: "November to March",
        bestMonths: [11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Mahavir Jayanti",
                date: "2026-04-06",
                description: "Birthday celebration of Lord Mahavira",
                rarity: "annual"
            },
            {
                name: "Paryushan Parva",
                date: "2026-08-29",
                description: "Most important Jain festival",
                rarity: "annual"
            }
        ],
        travelTips: "Vimal Vasahi and Luna Vasahi temples are most famous. Photography restricted inside temples.",
        nearestAirport: "Udaipur Airport (185 km)",
        nearestRailway: "Abu Road Railway Station (27 km)"
    },
    {
        id: 56,
        name: "Parasnath Hill Temple",
        religion: "jain",
        state: "Jharkhand",
        coordinates: [23.9629, 86.1607],
        significance: "Highest mountain in Jharkhand with 24 Jain temples",
        description: "Sacred to Jains as 20 out of 24 Tirthankaras attained moksha here. Complex of 24 temples on the summit requires a challenging trek.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Nirvan Kalyanak",
                date: "2026-04-15",
                description: "Celebrates liberation of Tirthankaras",
                rarity: "annual"
            }
        ],
        travelTips: "Challenging 9 km trek to summit. Stay overnight at dharmashalas. Stunning sunrise views.",
        nearestAirport: "Bokaro Airport (70 km)",
        nearestRailway: "Parasnath Railway Station (1 km)"
    },
    {
        id: 57,
        name: "Sonagiri Jain Temples",
        religion: "jain",
        state: "Madhya Pradesh",
        coordinates: [25.2063, 78.2082],
        significance: "Ancient Jain pilgrimage site with 77 temples",
        description: "77 Jain temples spread across five hills, some dating back to 9th-10th centuries. Famous for beautiful sunrise views and peaceful meditation spots.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Kartik Purnima",
                date: "2025-11-15",
                description: "Major Jain pilgrimage festival",
                rarity: "annual"
            }
        ],
        travelTips: "Climb starts early morning. Beautiful stone carvings and peaceful atmosphere for meditation.",
        nearestAirport: "Gwalior Airport (80 km)",
        nearestRailway: "Datia Railway Station (18 km)"
    },

    // More Islamic Sites
    {
        id: 58,
        name: "Gol Gumbaz",
        religion: "islamic",
        state: "Karnataka",
        coordinates: [17.3280, 75.7139],
        significance: "Mausoleum with world's second largest dome",
        description: "Tomb of Mohammed Adil Shah, featuring the world's second largest dome. Famous for its acoustic properties where even whispers echo seven times.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Heritage Festival",
                date: "2026-01-15",
                description: "Celebration of Bijapur's architectural heritage",
                rarity: "annual"
            }
        ],
        travelTips: "Test the whispering gallery acoustic effect. Museum displays artifacts from Adil Shahi dynasty.",
        nearestAirport: "Belgaum Airport (205 km)",
        nearestRailway: "Bijapur Railway Station (2 km)"
    },
    {
        id: 59,
        name: "Charminar",
        religion: "islamic",
        state: "Telangana",
        coordinates: [17.3616, 78.4747],
        significance: "Iconic monument and mosque built in 1591",
        description: "Built by Sultan Muhammad Quli Qutb Shah, this iconic structure with four minarets serves as both a monument and mosque, symbolizing Hyderabad city.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Ramadan",
                date: "2026-02-28",
                description: "Holy month with evening prayers and iftar",
                rarity: "annual"
            }
        ],
        travelTips: "Climb to top for city views. Explore nearby Laad Bazaar for bangles and pearls.",
        nearestAirport: "Rajiv Gandhi International Airport (30 km)",
        nearestRailway: "Hyderabad Deccan Railway Station (5 km)"
    },
    {
        id: 60,
        name: "Ibrahim Roza",
        religion: "islamic",
        state: "Karnataka",
        coordinates: [17.3139, 75.7258],
        significance: "Elegant Islamic tomb often called Taj Mahal of Deccan",
        description: "Tomb of Ibrahim Adil Shah II and his queen, known for its elegant proportions and detailed Islamic architecture. Said to have inspired the Taj Mahal.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Urs of Ibrahim Adil Shah",
                date: "2026-05-10",
                description: "Annual commemoration with qawwali performances",
                rarity: "annual"
            }
        ],
        travelTips: "Beautiful gardens surrounding the tomb. Best photographed during golden hour.",
        nearestAirport: "Belgaum Airport (205 km)",
        nearestRailway: "Bijapur Railway Station (3 km)"
    },

    // More Christian Sites
    {
        id: 61,
        name: "Se Cathedral, Goa",
        religion: "christian",
        state: "Goa",
        coordinates: [15.5037, 73.9119],
        significance: "Largest church in Asia dedicated to St. Catherine",
        description: "Built in Portuguese-Manueline style, this is the largest church in Asia. Houses the miraculous Cross of Miracles and tomb of St. Francis Xavier.",
        bestTimeToVisit: "November to February",
        bestMonths: [11, 12, 1, 2],
        festivals: [
            {
                name: "Feast of St. Francis Xavier",
                date: "2025-12-03",
                description: "Major pilgrimage with exposition of saint's relics",
                rarity: "annual"
            },
            {
                name: "Christmas",
                date: "2025-12-25",
                description: "Grand Christmas celebration in historic cathedral",
                rarity: "annual"
            }
        ],
        travelTips: "Visit when body of St. Francis Xavier is exposed (every 10 years). Beautiful Portuguese architecture.",
        nearestAirport: "Goa International Airport (30 km)",
        nearestRailway: "Karmali Railway Station (15 km)"
    },
    {
        id: 62,
        name: "Basilica of Our Lady of Ransom",
        religion: "christian",
        state: "Tamil Nadu",
        coordinates: [8.1778, 77.5319],
        significance: "Important Catholic pilgrimage site in Kanyakumari",
        description: "Built in 1335, this Gothic-style church is dedicated to Our Lady of Ransom. Popular pilgrimage site with beautiful stained glass windows.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Feast of Our Lady of Ransom",
                date: "2025-09-24",
                description: "Annual feast with grand processions",
                rarity: "annual"
            }
        ],
        travelTips: "Near southernmost tip of India. Combine with sunrise at Kanyakumari.",
        nearestAirport: "Trivandrum Airport (90 km)",
        nearestRailway: "Kanyakumari Railway Station (2 km)"
    },
    {
        id: 63,
        name: "St. Thomas Mount",
        religion: "christian",
        state: "Tamil Nadu",
        coordinates: [12.9918, 80.1982],
        significance: "Believed site where St. Thomas was martyred",
        description: "Small hillock where St. Thomas the Apostle is believed to have been martyred. Ancient church built around the cave where he lived and prayed.",
        bestTimeToVisit: "November to February",
        bestMonths: [11, 12, 1, 2],
        festivals: [
            {
                name: "Feast of St. Thomas",
                date: "2025-12-21",
                description: "Celebration of apostle's martyrdom",
                rarity: "annual"
            }
        ],
        travelTips: "Climb 134 steps to reach the church. Peaceful atmosphere with city views.",
        nearestAirport: "Chennai International Airport (8 km)",
        nearestRailway: "St. Thomas Mount Railway Station (2 km)"
    },

    // More Sikh Sites
    {
        id: 64,
        name: "Takht Sri Damdama Sahib",
        religion: "sikh",
        state: "Punjab",
        coordinates: [30.2081, 75.5621],
        significance: "One of five Takhts where Guru Gobind Singh stayed",
        description: "Fifth Takht of Sikhs where Guru Gobind Singh compiled the final version of Guru Granth Sahib. Known as 'Guru ki Kashi' (Guru's Varanasi).",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Hola Mohalla",
                date: "2026-03-15",
                description: "Sikh festival with martial arts displays",
                rarity: "annual"
            },
            {
                name: "Guru Gobind Singh Jayanti",
                date: "2026-01-17",
                description: "Birthday celebration of tenth Guru",
                rarity: "annual"
            }
        ],
        travelTips: "Visit Guru ka Mahal where Guru Gobind Singh lived. Beautiful gurdwara architecture.",
        nearestAirport: "Bathinda Airport (15 km)",
        nearestRailway: "Talwandi Sabo Railway Station (2 km)"
    },
    {
        id: 65,
        name: "Gurdwara Bangla Sahib",
        religion: "sikh",
        state: "Delhi",
        coordinates: [28.6262, 77.2088],
        significance: "Historic gurdwara associated with Guru Har Krishan",
        description: "One of the most prominent Sikh gurdwaras in Delhi, known for its golden dome and sarovar (holy pond). Famous for serving free meals to thousands daily.",
        bestTimeToVisit: "October to March",
        bestMonths: [10, 11, 12, 1, 2, 3],
        festivals: [
            {
                name: "Guru Nanak Jayanti",
                date: "2025-11-15",
                description: "Birthday celebration of first Guru",
                rarity: "annual"
            },
            {
                name: "Guru Har Krishan Jayanti",
                date: "2026-07-23",
                description: "Birthday of eighth Guru",
                rarity: "annual"
            }
        ],
        travelTips: "Experience langar (free community kitchen). Beautiful reflection of golden dome in sarovar.",
        nearestAirport: "Indira Gandhi International Airport (15 km)",
        nearestRailway: "New Delhi Railway Station (3 km)"
    }];

// States list for filter dropdown
const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Jammu and Kashmir", "Ladakh"
];

// Religion icons mapping
const religionIcons = {
    hindu: "🕉️",
    buddhist: "☸️", 
    jain: "hamsa.png",
    sikh: "☬",
    christian: "✝️",
    islamic: "☪️",
    bahai: "bahai.png",
    other: "🔯"
};

// Function to calculate time until a specific date
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

// Function to check if current month is optimal for visiting
function isOptimalTime(bestMonths) {
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    return bestMonths.includes(currentMonth);
}

// Function to get next optimal visit time
function getNextOptimalTime(bestMonths) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    // Find the next month in the optimal range
    let nextMonth = bestMonths.find(month => month > currentMonth);
    let targetYear = currentYear;
    
    if (!nextMonth) {
        // If no month found this year, take the first month of next year
        nextMonth = bestMonths[0];
        targetYear = currentYear + 1;
    }
    
    const targetDate = new Date(targetYear, nextMonth - 1, 1);
    return calculateTimeUntil(targetDate);
}