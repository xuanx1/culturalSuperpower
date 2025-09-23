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
    }
];

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
    jain: "�",
    sikh: "☬",
    christian: "✝️",
    islamic: "☪️",
    bahai: "🌟",
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