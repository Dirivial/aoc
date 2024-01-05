file = open("input.txt")

sum = 0
line = file.readline()
while line != "":
    _, a = line.split(":")
    hands = a.split(";")

    minRed = 0
    minBlue = 0
    minGreen = 0
    for hand in hands:
        cubeSets = hand.split(",")
        for cubes in cubeSets:
            c = cubes.strip()
            num, color = c.split(" ")
            if color == "green" and int(num) > minGreen:
                minGreen = int(num)
            elif color == "red" and int(num) > minRed:
                minRed = int(num)
            elif color == "blue" and int(num) > minBlue:
                minBlue = int(num)
    line = file.readline()
    sum += minRed * minBlue * minGreen
print(sum)
