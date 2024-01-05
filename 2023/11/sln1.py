file = open("input.txt")

line = file.readline()

EXPANSION = 1

galaxies = []
colsToExpand = [x for x in range(len(line) - 1)]
rowsToExpand = []
y = 0

while line != "":
    foundGalaxy = False
    for x in range(len(line)):
        if line[x] == "#":
            foundGalaxy = True
            galaxies.append((x, y))
            if x in colsToExpand:
                colsToExpand.remove(x)
    if not foundGalaxy:
        rowsToExpand.append(y)
    line = file.readline()
    y += 1

# Expand universe
for galaxy in range(len(galaxies)):
    x, y = galaxies[galaxy]
    for r in colsToExpand:
        if r < x:
            a, b = galaxies[galaxy]
            galaxies[galaxy] = (a + EXPANSION, b)
        else:
            break
    for r in rowsToExpand:
        if r < y:
            a, b = galaxies[galaxy]
            galaxies[galaxy] = (a, b + EXPANSION)
        else:
            break
# Compute distances
sum = 0
for galaxyA in range(len(galaxies) - 1):
    for galaxyB in range(galaxyA + 1, len(galaxies)):
        a = galaxies[galaxyA]
        b = galaxies[galaxyB]
        distance = abs(a[0] - b[0]) + abs(a[1] - b[1])
        sum += distance
print(sum)
