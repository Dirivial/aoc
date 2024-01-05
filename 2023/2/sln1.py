file = open("input.txt")

MAX_RED = 12
MAX_BLUE = 14
MAX_GREEN = 13

sum = 0
id = 1
line = file.readline()
while line != "":
    _, a = line.split(":")
    hands = a.split(";")

    isValid = True
    for hand in hands:
        if not isValid:
            break
        cubeSets = hand.split(",")
        for cubes in cubeSets:
            c = cubes.strip()
            num, color = c.split(" ")
            if color == "green" and int(num) > MAX_GREEN:
                isValid = False
                break
            elif color == "red" and int(num) > MAX_RED:
                isValid = False
                break
            elif color == "blue" and int(num) > MAX_BLUE:
                isValid = False
                break
    if isValid:
        sum += id
    line = file.readline()
    id += 1
print(sum)
