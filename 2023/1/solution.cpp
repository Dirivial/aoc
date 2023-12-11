#include <fstream>
#include <iostream>
#include <string>
#include <vector>

const std::string INPUT_FILE = "./input.txt";
const std::string TEST_FILE = "./test.txt";

void part1(std::vector<std::string> input) {
  int result = 0;

  std::string numbers[] = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};

  for (int i = 0; i < input.size(); i++) {

    int firstPos = input[i].length();
    int lastPos = 0;
    for (int j = 0; j < 10; j++) {
      size_t pos = input[i].find(numbers[j]);
      if (pos != std::string::npos) {
        if (pos < firstPos) {
          firstPos = pos;
        }
      }
      pos = input[i].rfind(numbers[j]);
      if (pos != std::string::npos) {
        if (pos > lastPos) {
          lastPos = pos;
        }
      }
    }
    // Convert positions to numbers
    firstPos = std::stoi(input[i].substr(firstPos, 1));
    lastPos = std::stoi(input[i].substr(lastPos, 1));
    result += firstPos * 10 + lastPos;
  }

  printf("Part 1: %d\n", result);
}

void part2(std::vector<std::string> input) {

  int result = 0;

  std::string numbers[] = {
      "1",   "2",   "3",     "4",    "5",    "6",   "7",     "8",     "9",
      "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  };

  for (int i = 0; i < input.size(); i++) {
    int firstPos = input[i].length();
    int lastPos = 0;
    int tempA = 0;
    int tempB = 0;
    for (int j = 0; j < 18; j++) {
      size_t pos = input[i].find(numbers[j]);
      if (pos != std::string::npos) {
        if (pos < firstPos) {
          firstPos = pos;
          tempA = (j % 9) + 1;
        }
      }
      pos = input[i].rfind(numbers[j]);
      if (pos != std::string::npos && pos != input[i].length()) {
        if (pos > lastPos) {
          lastPos = pos;
          tempB = (j % 9) + 1;
        }
      }
    }
    // rfind seems to avoid index 0, which took a lot of time to find
    if (tempB == 0) {
      tempB = tempA;
    }
    result += tempA * 10 + tempB;
  }
  printf("Part 2: %d\n", result);
}

int main(int argc, char *argv[]) {

  // Try to open the input file
  std::ifstream inputFile(INPUT_FILE);
  std::ifstream inputTestFile(TEST_FILE);

  // Check if file is open
  if (!inputFile.is_open() || !inputTestFile.is_open()) {
    std::cout << "Failed to open file." << std::endl;
    return 1;
  }

  std::vector<std::string> input;
  std::vector<std::string> testInput;

  std::string line; // Current line

  // Read the file line by line
  while (std::getline(inputFile, line)) {
    // Do something with the line
    input.push_back(line);
  }
  // Read the file line by line
  while (std::getline(inputTestFile, line)) {
    // Do something with the line
    testInput.push_back(line);
  }

  inputFile.close();
  inputTestFile.close();

  part1(input);
  part2(input);

  return 0;
}
