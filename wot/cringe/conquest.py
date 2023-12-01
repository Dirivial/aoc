from queue import PriorityQueue


class Node:
    def __init__(self, id, weight):
        self.reaches = []
        self.weight = weight
        self.id = id

    def add_reaching(self, node):
        self.reaches.append(node)


(node_count, bridge_count) = input().split(" ")

lines = []
for i in range(int(node_count) + int(bridge_count)):
    lines.append(input())

bridges, nodes = [], []

id = 0
for line in lines:
    if line.find(" ") != -1:
        (a, b) = line.split(" ")
        bridges.append([int(a)-1, int(b)-1])
    else:
        nodes.append(Node(id=id, weight=int(line)))
        id += 1

for bridge in bridges:
    nodes[bridge[0]].add_reaching(nodes[bridge[1]])
    nodes[bridge[1]].add_reaching(nodes[bridge[0]])

found_nodes = {
    0: True,
}

accessible_nodes = PriorityQueue()

for node in nodes[0].reaches:
    accessible_nodes.put((node.weight, node.id))

army_size = nodes[0].weight

while not accessible_nodes.empty():
    (weight, id) = accessible_nodes.get()
    if id not in found_nodes:
        if weight < army_size:
            army_size += weight
            found_nodes[id] = True
            for node in nodes[id].reaches:
                accessible_nodes.put((node.weight, node.id))
        else:
            break

print(army_size)
