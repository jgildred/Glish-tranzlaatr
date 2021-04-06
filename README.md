# Glish-tranzlaatr
Glish tranzlaatr is an English to Glish language translator that runs on Node.js (tested on v14). It uses a slighlty modified version of the CMU phonetic English dictionary (http://www.speech.cs.cmu.edu/cgi-bin/cmudict/). The project can run as Cloud Function (https://cloud.google.com/functions). For information on the Glish language visit http://glish.info.

HOW TO USE IT

Simply pass a GET query parameter "tecst" that contatins the English text you want translated to Glish. You can also send as a parameter in the body of a POST. The response is the translated plain text in Glish.

TESTING

There are only a few test cases written. Feel free to add more.

CONTRIBUTING

If you are interested in contributing, send a pull request.