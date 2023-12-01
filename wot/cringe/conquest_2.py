from queue import PriorityQueue


(node_count, bridge_count) = input().split(" ")

lines = []
for i in range(int(node_count) + int(bridge_count)):
    lines.append(input())

bridges, nodes = {}, {}

id = 0
for line in lines:
    if line.find(" ") != -1:
        (a, b) = line.split(" ")
        if (int(a)-1 not in bridges):
            bridges[int(a)-1] = [int(b)-1]
        else:
            bridges[int(a)-1].append(int(b)-1)

        if (int(b)-1 not in bridges):
            bridges[int(b)-1] = [int(a)-1]
        else:
            bridges[int(b)-1].append(int(a)-1)
    else:
        nodes[id] = int(line)
        id += 1

found_islands = {
    0: True,
}

accessible_islands = PriorityQueue()

for b in bridges[0]:
    accessible_islands.put((nodes[b], b))

army_size = nodes[0]

while not accessible_islands.empty():
    (weight, id) = accessible_islands.get()
    if id not in found_islands:
        if weight < army_size:
            army_size += weight
            found_islands[id] = True
            for node in bridges[id]:
                accessible_islands.put((nodes[node], node))
        else:
            break

print(army_size)
