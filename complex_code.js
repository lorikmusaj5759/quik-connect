/* filename: complex_code.js */

// This JavaScript code demonstrates a sophisticated and complex program that performs a variety of computations and manipulations.

// Generate a random number within a specific range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Calculate the Fibonacci sequence up to a given limit
function fibonacciSequence(limit) {
  var sequence = [0, 1];

  for (var i = 2; i < limit; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
}

// Perform a complex mathematical computation
function performCalculation(a, b, c) {
  var result = (Math.pow(a, b) + Math.sqrt(c)) / (Math.abs(a) + Math.log10(b + c));

  return result.toFixed(2);
}

// Encode a string using a Caesar cipher with a given shift
function caesarCipher(string, shift) {
  var result = '';

  for (var i = 0; i < string.length; i++) {
    var charCode = string.charCodeAt(i);
    var newCharCode;

    if (charCode >= 65 && charCode <= 90) {
      newCharCode = ((charCode - 65 + shift) % 26) + 65;
    } else if (charCode >= 97 && charCode <= 122) {
      newCharCode = ((charCode - 97 + shift) % 26) + 97;
    } else {
      newCharCode = charCode;
    }

    result += String.fromCharCode(newCharCode);
  }

  return result;
}

// Generate a random password with a given length and complexity
function generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
  var charset = '';
  var password = '';

  if (includeUppercase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (includeLowercase) {
    charset += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (includeNumbers) {
    charset += '0123456789';
  }
  if (includeSymbols) {
    charset += '!@#$%^&*()';
  }

  for (var i = 0; i < length; i++) {
    var randomIndex = getRandomNumber(0, charset.length - 1);
    password += charset[randomIndex];
  }

  return password;
}

// Perform an image manipulation by applying a grayscale filter
function applyGrayscaleFilter(imageData) {
  var resultData = [];
  var data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
    resultData[i] = grayscale;
    resultData[i + 1] = grayscale;
    resultData[i + 2] = grayscale;
    resultData[i + 3] = data[i + 3];
  }

  return resultData;
}

// ...continue with more functions and complex code

// Example usage of the above functions
console.log(getRandomNumber(1, 10));
console.log(fibonacciSequence(20));
console.log(performCalculation(2, 3, 5));
console.log(caesarCipher('Hello, World!', 3));
console.log(generateRandomPassword(10, true, true, true, false));
console.log(applyGrayscaleFilter({ data: [255, 0, 0, 255] }));