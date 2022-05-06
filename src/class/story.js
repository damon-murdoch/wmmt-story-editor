class Story
{
    // Constructor
    // Requires a map to get info from
    constructor(map)
    {
        // Get the map dimensions
        let d = map.getDimensions();

        // No game by default
        let game = null;

        // 88 06 - MT5
        // ?? ?? - MT5DX
        // E8 85 - MT5DX+
        // F8 3F - MT6
        // A8 69 - MT6R

        // Get the first two nibbles in the file - identifies the game
        let gameCheck = map.getElementAt(0, 0) + map.getElementAt(0, 1);

        // Check for Maximum Tune 5
        if (gameCheck === '7023')
        {
            // Set the game to Maxi 5
            game = 'wmmt5';
        }
        else if (gameCheck === '082C') // Maximum Tune 5DX/5DX+
        {
            game = 'wmmt5dx';
        }
        else if (gameCheck === '0808' || gameCheck === '????') // Maximum Tune 6 / 6R
        {
            // Set the game to Maxi 6
            game = 'wmmt6';
        }
        else // Try to load it as an MT6 file
        {
            // Throw the error to the calling process
            throw ("Unrecognised game:" + gameCheck);
        }

        // Set the map for this car to the given map
        this.map = map;

        // Set the game for the save file
        this.game = game;

        // Get the hex table info for the game selected
        this.table = HEXTABLE[game];
    }

    getBitArray(value)
    {
        // Temporary value (Should be 8 character string)
        let v = value.toString(16).padEnd(8, 0);

        // Build and return the bit mask array
        return  [
            v.slice(0,2).split("").reverse().join(""), // First Byte
            v.slice(2,4).split("").reverse().join(""), // Second Byte
            v.slice(4,6).split("").reverse().join(""), // Third Byte
            v.slice(6,8).split("").reverse().join(""), // Fourth Byte
        ]
    }

    // setMap(map: Map): void
    // Given a map, sets the car's 
    // map to the given map object.
    setMap(map)
    {
        // Update the map object
        this.map = map;
    }

    // getMap(void): Map
    // Returns the map stored
    // within the car object.
    getMap()
    {
        // Return the map object
        return this.map;
    }

    // setGame(game: String): Void
    setGameId(game)
    {
        // Updates the id of the game
        this.game = game;
    }

    // getGame(void): String
    getGameId()
    {
        // Return the id of the game
        return this.game;
    }

    // setGame(game: String): Void
    setGameName(game)
    {
        // Updates the name of the game
        this.table.name = game;
    }

    // getGame(void): String
    getGameName()
    {
        // Return the name of the game
        return this.table.name;
    }

    setWins(value){}

    // getWins(void): Integer
    getWins()
    {
        return Number("0x" + 
            this.map.getRangeAt(
                ... this.table.location.wins
            ).reverse().join("")
        );
    }

    setStreak(value){}
    
    getStreak()
    {
        return Number("0x" + 
            this.map.getRangeAt(
                ... this.table.location.streak
            ).reverse().join("")
        );
    }

    setLoops(value){}

    getLoops()
    {
        return Number("0x" + 
            this.map.getRangeAt(
            ... this.table.location.loops
            ).reverse().join("")
        );
    }

    setStoryBitmask(value)
    {
        // Get the bit array for the bit mask
        let bitmask = this.getBitArray(value);

        // Set the bit array in the map
        this.map.setRangeAt(
            // Splat the locked mask location
            ... this.table.location.wins_mask, bitmask);
    }
    
    getStoryBitmask()
    {
        return Number("0x" + 
            this.map.getRangeAt(
            ... this.table.location.wins_mask
            ).reverse().join("")
        );
    }

    setLockedBitmask(value)
    {
        // Get the bit array for the bit mask
        let bitmask = this.getBitArray(value);

        // Set the bit array in the map
        this.map.setRangeAt(
            // Splat the locked mask location
            ... this.table.location.locked_mask, bitmask);
    }
    
    getLockedBitmask()
    {
        return Number("0x" + 
            this.map.getRangeAt(
            ... this.table.location.locked_mask
            ).reverse().join("")
        );
    }
}