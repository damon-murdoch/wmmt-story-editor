// By default, no car is selected
document.story = null;

// No recorded file name
document.filename = null;

// Completed story bit mask
document.story_bitmask = 0;

// Locked story bit mask
document.locked_bitmask = 0;

// First 4 chapters unlocked, 
// all other chapters locked
default_locked_bitmask = 1048560;

// updateInputStatus(status: Int)
// If status is true, disables all of
// the input elements. If status is false,
// enables all of the input elements.
function updateInputStatus(status)
{
    // Sets the status of all elements with 'inp' in the name to 
    // enabled / disabled (whatever status is set to)
    document.querySelectorAll('[id^="inp-"]').forEach(input => {
        // Disable the element
        input.disabled = status;
    });
}

// setValue(id: String, value: Boolean)
// If it exists, sets the selected property for 
// the given element to true. Otherwise, does nothing.
function setValue(id, value)
{
    try
    {
        // Set the element with the given id to the provided value
        document.getElementById(id).value = value;

        // Successful assignment
        return true;
    }
    catch(err) // General failure
    {
        // Report failure to console
        console.log("Failed to set selected value of element with id '" + id + "' to value '" + value + "'! Reason:", err);

        // Assignment failed
        return false;
    }
}

// resetPage(void): Void
// Hard reloads the current
// page and empties all of the
// input fields.
function resetPage()
{
    // Page hard reload (clear cache)
    window.location.reload(true);
}

// resetDropdown(id: String): Void
// If it exists, resets the select
// element with the given id to the
// default option.
function resetDropdown(id)
{
    try
    {
        // Get the element with the given id
        let element = document.getElementById(id);

        // Clear the inner html of the element
        element.innerHTML = "";

        // Add the default element to the child
        element.appendChild(newOption(
            'o_' + id + '_default', // Element id
            'default', // Default option
            'Not Available' // Default text
        )); 
    }
    catch
    {
        console.log("Failed: Dropdown '",id,"' does not exist!");
    }
}

// newOption(id: String, value: String, content: String): Element
// Creates a select element with the given id, value and content
// and returns it to the calling process.
function newOption(id, value, content)
{
    // Create a new option
    let option = document.createElement('option');

    // Assign the html content to the innerHTML
    option.innerHTML = content;

    // Set the option value to the value provided
    option.value = value;

    // Set the option id to the id provided
    option.id = id;

    // Return the created option object
    return option;
}

// setSelected(id: String, value: Boolean): Void
// If it exists, sets the selected property for 
// the given element to true. Otherwise, does nothing.
function setSelected(id, value)
{
    try
    {
        // Set the element with the given id to the provided value
        document.getElementById(id).selected = value;

        // Successful assignment
        return true;
    }
    catch(err) // General failure
    {
        // Report failure to console
        console.log("Failed to set selected property of element with id '" + id + "' to value '" + value + "'! Reason:", err);

        // Assignment failed
        return false;
    }
}

// setDisabled(id: String, value: Boolean)
// If it exists, sets the disabled property for 
// the given element to true. Otherwise, does nothing.
function setDisabled(id, value)
{
    try
    {
        // Set the element with the given id to the provided value
        document.getElementById(id).disabled = value;

        // Successful assignment
        return true;
    }
    catch(err) // General failure
    {
        // Report failure to console
        console.log("Failed to set disabled property of element with id '" + id + "' to value '" + value + "'! Reason:", err);

        // Assignment failed
        return false;
    }
}

// handleDownload(Void): Void
// Handle the save file download from the site
function handleDownload()
{
    // downloadBlob(data: Uint8array, filename: String, mimetype: String)
    function downloadBlob(data, filename, mimetype) 
    {
        // downloadURL(data: Uint8array, filename: String): Void
        function downloadURL(data, filename) 
        {
            // Create link element
            const a = document.createElement('a')

            // Point link to the data
            a.href = data

            // Set the download name to the filename
            a.download = filename

            // Add the link to the document
            document.body.appendChild(a)

            // Hide the link
            a.style.display = 'none'

            // Click on the link
            a.click()

            // Remove the link
            a.remove()
        }

        // Create a new blob using the data
        const blob = new Blob([data], {
            // Use given mimetype for data write
            type: mimetype
        });
        
        // Create an object url for the blob data
        const url = window.URL.createObjectURL(blob)
        
        // Download the file
        downloadURL(url, filename)
        
        // Set a download timeout before the url is revoked
        setTimeout(() => window.URL.revokeObjectURL(url), 1000)
    }

    // If a car has been uploaded
    if (this.document.story !== null)
    {
        // Get the UINT8 array, convert to blob data and download the file
        downloadBlob(
            this.document.story.getMap().getUINT8Array(), // Binary Values
            document.filename, // Filename of the uploaded file
            'application/octet-stream' // MIMETYPE for Binary Files
        );
    }
    else // No car uploaded
    {
        // Do nothing
    }
}

// handleUpload(Void): Void
// Handle the file upload to the site
function handleUpload()
{
    // Get the file from the upload 
    let file = document.getElementById('i_file').files[0];

    // If a file has been uploaded
    if (file !== undefined)
    {
        // Set the filename variable to the name of the uploaded file
        document.filename = file.name;

        // File reader object for opening user input
        const reader = new FileReader();

        // Code to run if reader succeeds
        reader.onload = function(e) {

            try
            {
                // Remove existing story object
                document.story = null;

                // Get the map from the buffer,
                // and create a story using the map
                document.story = new Story(
                    new Map(e.target.result) // Binary data of the story file
                )

                if (document.story)
                {
                    // Update the selected game on the form
                    setSelected('o_' + document.story.getGameId(), true);

                    // Get the value of the total wins and set it to the input element
                    document.getElementById('inp-wins').value = document.story.getWins();

                    // Get the value of the current win streak and set it to the input
                    document.getElementById('inp-streak').value = document.story.getStreak();

                    // Get the value of the number of loops completed and set it to the input
                    document.getElementById('inp-loops').value = document.story.getLoops();

                    // Set the completed story bit mask to the file data
                    document.story_bitmask = document.story.getStoryBitmask();

                    // Set the locked story bit mask to the file data
                    document.locked_bitmask = document.story.getLockedBitmask();

                    // Update the checkbox values
                    updateCheckboxes();

                    // Set the story names for the current streak
                    updateStoryNames(document.story.getLoops());

                    // Enable the input menu items
                    updateInputStatus(false);
                }
            }
            catch(err) // Fails to create car object
            {
                // Disable all of the drop-downs

                // Write error to terminal
                console.error("Error:",err);
            }
        };

        // Read the binary content from the file
        reader.readAsArrayBuffer(file);
    }
}

// updateCheckboxes(void): Void
// Updates the checkboxes to have
// the values reflected by the story
// and locked bitmask values.
function updateCheckboxes()
{
    // Loop over the twenty stories
    for(let i = 0; i < 20; i++)
    {
        // 'i'th bit for the bit mask
        let bit = Math.pow(2, i);

        // Current story index
        let story = i + 1;

        // Set the locked checkbox to true
        document.getElementById('inp-' + story + '-clr').checked = (document.story_bitmask & bit);

        // Set the locked checkbox to true
        document.getElementById('inp-' + story + '-lck').checked = (document.locked_bitmask & bit);
    }
}

// usePresetDefault(): Void
// Clears your save file to 
// fully stock, 0 wins, 0 streak
// and first chapter. 
function usePresetDefault()
{
    // Get the element from the document
    let element = document.getElementById('inp-default');

    // No total wins
    updateTotalWins(0);

    // No total loops
    updateTotalLoops(0);

    // No win streak
    updateWinStreak(0);

    // Clear the completed stories
    setWonChapters(0);

    // Set the locked stories to default
    setLockedChapters(default_locked_bitmask);

    // Uncheck the button
    element.checked = false;
}

// usePresetFullRun(): Void
// Sets your save file to have
// completed one full run of
// the game, wins and streak
// are dependent on the game
// in use. 
function usePresetFullRun()
{
    // Get the element from the document
    let element = document.getElementById('inp-fullrun');

    // Get the id of the current game
    let game = document.story.getGameId();

    // Current game is maxi 6
    if (game == 'wmmt6')
    {
        // 100 total wins
        updateTotalWins(100);

        // 5 total loops
        updateTotalLoops(5);

        // 100 win streak
        updateWinStreak(100);
    }
    else if (
        // Current game is 5/5dx+
        game == 'wmmt5' || 
        game == 'wmmt5dx'
    )
    {
        // 60 total wins
        updateTotalWins(60);

        // 3 total loops
        updateTotalLoops(3);

        // 60 win streak
        updateWinStreak(60);
    }
    else
    {
        console.log('unhandled gameid:', game)
    }

    // Clear the completed stories
    setWonChapters(0);

    // Set the locked stories to default
    setLockedChapters(default_locked_bitmask);

    // Uncheck the button
    element.checked = false;
}

// updateStoryNames(loops: Int)
// Given the number of completed loops, 
// updates the story titles in the page
// and displays the number of completed
// chapters and stories to the screen.
function updateStoryNames(loops)
{
    // Get all of the chapters for the given game
    let chapters = document.story.table.value.chapters;

    // Get the number of story runs that are finished
    let run = Math.floor(loops / chapters.length);

    // Get the current story chapter
    let chapter = loops % chapters.length;

    // Story 1 title header
    let s1 = document.getElementById('s1-title');
    s1.innerHTML = chapters[chapter][0];

    // Story 2 title header
    let s2 = document.getElementById('s2-title');
    s2.innerHTML = chapters[chapter][1];

    // Story 3 title header
    let s3 = document.getElementById('s3-title');
    s3.innerHTML = chapters[chapter][2];

    // Story 4 title header
    let s4 = document.getElementById('s4-title');
    s4.innerHTML = chapters[chapter][3];

    document.getElementById('text-loops').value = "Runs: " + run + ", Current Chapter: " + chapter;
}

function updateTotalWins(n)
{
    // Get the total wins element
    let element = document.getElementById('inp-wins');

    // Set the value of the element to the new value
    element.value = n;

    // Set the value of the save data to the new value
    document.story.setWins(n);
}

function updateTotalLoops(n)
{
    // Get the total wins element
    let element = document.getElementById('inp-loops');

    // Set the value of the element to the new value
    element.value = n;
    
    // Set the value of the save data to the new value
    document.story.setLoops(n);

    // Display the loop info on the screen
    updateStoryNames(n)
}

function updateWinStreak(n)
{
    // Get the total wins element
    let element = document.getElementById('inp-streak');

    // Set the value of the element to the new value
    element.value = n;
    
    // Set the value of the save data to the new value
    document.story.setStreak(n);
}

// setWonChapters(n: Int): Void
// Given an integer (bit mask), 
// sets the won chapters bit mask
// to the given bit mask and updates
// the check boxes.
function setWonChapters(n)
{
    // Set the document bitmask to the new bitmask
    document.story_bitmask = n;

    // Set the save file bitmask to the new bitmask
    document.story.setStoryBitmask(n);

    // Update the check boxes
    updateCheckboxes();
}

// updateWonChapters(n: Int): Void
// Given an integer, sets (or unsets) 
// the bit corresponding to that story 
// in the cleared chapters bit mask. 
function updateWonChapters(n){

    // Get the checkbox element
    let cb = document.getElementById('inp-' + (n+1) + '-clr');

    // Get the bit to set for the chapter
    let bit = Math.pow(2, n);

    // If the box is checked
    if (cb.checked)
    {
        // Set the bit on the mask
        document.story_bitmask = (document.story_bitmask | bit);
    }
    else // Box is unchecked
    {
        // Unset the bit on the mask
        document.story_bitmask = (document.story_bitmask & ~(bit));
    }

    // Update the story cleared bit mask value
    document.story.setStoryBitmask(document.story_bitmask);
}

// setLockedChapters(n: Int): Void
// Given an integer (bit mask), 
// sets the locked chapters bit mask
// to the given bit mask and updates
// the check boxes.
function setLockedChapters(n)
{
    // Set the document bitmask to the new bitmask
    document.locked_bitmask = n;

    // Set the save file bitmask to the new bitmask
    document.story.setLockedBitmask(n);

    // Update the check boxes
    updateCheckboxes();
}

// updateLockedChapters(n: Int): Void
// Given an integer, sets (or unsets) 
// the bit corresponding to that story 
// in the locked chapters bit mask.
function updateLockedChapters(n){

    // Get the checkbox element
    let cb = document.getElementById('inp-' + (n+1) + '-lck');

    // Get the bit to set for the chapter
    let bit = Math.pow(2, n);

    // If the box is checked
    if (cb.checked)
    {
        // Set the bit on the mask
        document.locked_bitmask = (document.locked_bitmask | bit);
    }
    else // Box is unchecked
    {
        // Unset the bit on the mask
        document.locked_bitmask = (document.locked_bitmask & ~(bit));
    }

    // Update the story locked bit mask value
    document.story.setLockedBitmask(document.locked_bitmask);
}

// Initial Setup
Object.keys(HEXTABLE).forEach(id => {

    // Get the game selected drop-down from the form
    let select = document.getElementById('s_game');

    // Get the name of the game
    value = HEXTABLE[id].name;

    // Add an option element to the drop-down with the id and value
    select.appendChild(newOption(
        'o_' + id, // ID for the option
        id, // Value for the option
        value // Text for the option
    ));
});

// Disable all inputs by default
updateInputStatus(true);
