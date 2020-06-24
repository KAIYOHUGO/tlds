/**
 * add note to the database if the user is authenticated.
 * @param {object} - data send the firebase functions
 *      @param text {string} - the introduction of the note
 *      @param displayName {string} - displayName(can be found in 'UserConfig')
 *      @param picture {string} - user's photo
 *      @param content {string} - the path of the json file(from storage) link with the content
 *      @param image {string} - busy at working
 *      @param subject {string}
 * @returns {error} - It always return an error
 */
var AddNote = firebase.functions().httpsCallable("addNote");
