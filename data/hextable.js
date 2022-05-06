// Hex Address Table
const HEXTABLE = {
    wmmt5: { 
        name: "WMMT 5",
        location: {

            // Total Wins
            wins: [0x11, 0x8, 4], 

            // Win Streak
            streak: [0x13, 0x8, 4], 

            // Won stories bit mask
            wins_mask: [0x12, 0x0, 4],

            // Locked stories bit mask
            locked_mask: [0x15, 0x0, 4],

            // Current chapter
            loops: [0x12, 0x4, 4]
        }, 
        value: {
            chapters: [
                [ 
                    "Return of the Devil Z (Part 1)", 
                    "Return of the Devil Z (Part 2)", 
                    "Legendary GT-R", 
                    "Akasaka Straight"
                ], 
                [ 
                    "Monster Machine (Part 1)", 
                    "Monster Machine (Part 2)", 
                    "R200 CLUB (Part 1)", 
                    "R200 CLUB (Part 2)" 
                ], 
                [ 
                    "Hanshin Expressway (Part 1)", 
                    "Hanshin Expressway (Part 2)", 
                    "Phantom FC (Part 1)", 
                    "Phantom FC (Part 2)" 
                ], 
            ]
        }
    },
    wmmt5dx: {
        name: "WMMT 5DX/DX+",
        location: {

            // Current chapter
            loops: [0xF, 0x0, 4],

            // Total Wins
            wins: [0xF, 0x4, 4], 

            // Won stories bit mask
            wins_mask: [0xE, 0xC, 4],

            // Win Streak
            streak: [0x10, 0x4, 4], 

            // Locked stories bit mask
            locked_mask: [0x11, 0x0, 4],
        }, 
        value: {
            chapters: [
                [ 
                    "Return of the Devil Z (Part 1)", 
                    "Return of the Devil Z (Part 2)", 
                    "Legendary GT-R", 
                    "Akasaka Straight"
                ], 
                [ 
                    "Monster Machine (Part 1)", 
                    "Monster Machine (Part 2)", 
                    "R200 CLUB (Part 1)", 
                    "R200 CLUB (Part 2)" 
                ], 
                [ 
                    "Hanshin Expressway (Part 1)", 
                    "Hanshin Expressway (Part 2)", 
                    "Phantom FC (Part 1)", 
                    "Phantom FC (Part 2)" 
                ], 
            ]
        }
    }, 
    wmmt6: {
        name: "WMMT 6",
        location: {

            // Total Wins
            wins: [0xE, 0x8, 4], 

            // Win Streak
            streak: [0x10, 0x8, 4], 

            // Won stories bit mask
            wins_mask: [0xF, 0x4, 4],

            // Locked stories bit mask
            locked_mask: [0x11, 0x8, 4],

            // Current chapter
            loops: [0xF, 0x8, 4]
        }, 
        value: {
            chapters: [
                [ 
                    "Return of the Devil Z (Part 1)", 
                    "Return of the Devil Z (Part 2)", 
                    "Legendary GT-R", 
                    "Akasaka Straight"
                ], 
                [ 
                    "Monster Machine (Part 1)", 
                    "Monster Machine (Part 2)", 
                    "R200 CLUB (Part 1)", 
                    "R200 CLUB (Part 2)" 
                ], 
                [ 
                    "Hanshin Expressway (Part 1)", 
                    "Hanshin Expressway (Part 2)", 
                    "Phantom FC (Part 1)", 
                    "Phantom FC (Part 2)" 
                ], 
                [ 
                    "Garage ACE (Part 1)", 
                    "Garage ACE (Part 2)", 
                    "F1 Turbine (Part 1)", 
                    "F1 Turbine (Part 2)" 
                ], 
                [
                    "Zero on the Ground (Part 1)", 
                    "Zero on the Ground (Part 2)", 
                    "FD Master (Part 1)", 
                    "FD Master (Part 2)", 
                ],
            ]
        }
    }
}