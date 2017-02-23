
// Function that writes data to the Firebase
function writeButtonData(input){	
	database.ref().set({
        Button_input: input,
    });
}

