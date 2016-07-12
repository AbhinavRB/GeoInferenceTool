from functools import reduce
import json
import math

class Angle(object):
	"""docstring for Angle"""
	def __init__(self, id, value, lLine, rLine):
		self.id = id
		self.value = value
		self.lLine = lLine
		self.rLine = rLine
		self.known = False if(self.value < 0) else True
	def setValue(self, val):
		self.value = val
		# self.known = True
	def __str__(self):
		return str(self.id)
		

class Point(object):
	"""docstring for Point"""
	def __init__(self, label, x, y):
		self.label = label
		self.x = x
		self.y = y
	def __str__(self):
		return "("+self.label+", "+str(self.x)+", "+str(self.y)+")"
		

class Line(object):
	"""docstring for Line"""
	def __init__(self, label, start, end):
		self.label = label
		self.start = start
		self.end = end
		try: self.slope = (self.end.y - self.start.y)/(self.end.x - self.start.x)
		except ZeroDivisionException:
			self.slope = 1j
	def __str__(self):
		return self.label+": "+str(self.start)+", "+str(self.end)

def pointCheck(a, b):
	return a.x == b.x and a.y == b.y


def checkTriangle(l1, l2, l3):
	points = [(l1.start.x, l1.start.y), (l1.end.x, l1.end.y), (l2.start.x, l2.start.y), (l2.end.x, l2.end.y), (l3.start.x, l3.start.y), (l3.end.x, l3.end.y),]
	pset = set(points)
	if(len(pset) == 3):
		if(l1.slope != l2. slope and l1.slope != l3. slope and l2.slope != l3. slope):
			print('Triangle!!')
			return [l1, l2, l3]
		else:
			#print('Nope')
			return []
	else:
		#print('Nope')
		return []

def getAngles(tri):
	a = []
	for ang in angles:
		if(ang.lLine in tri and ang.rLine in tri):
			a.append(ang)
	return a

def triangleFinder(lines):
	for l1 in lines:
		lines.remove(l1)
		for l2 in [x for x in lines if pointCheck(x.start, l1.start) or pointCheck(x.end, l1.start)]:
			for l3 in lines:
				connect = checkTriangle(l1, l2, l3)
				if not connect:
					pass
				else:
					triangles.append(connect)
					# for line in connect:
					# 	print(str(line), end=" -- ")
					# print()

def matchToTheorem():
	for tri in triangles:
		anglesInThis = getAngles(tri)
		for a in anglesInThis:
			if(not a.known):
				print(a.id, ":", "Angle sum property, ", [str(x) for x in anglesInThis if not x == a])
				a.value = 180 - (reduce(lambda x, y:x+y, [x.value for x in anglesInThis if not x == a]))
				print("Value =", a.value)

def checkStraight(l1, l2):
	# print(l1.slope, ", ", l2.slope)
	if(math.fabs(l1.slope) >= math.fabs(0.95*l2.slope) and math.fabs(l1.slope) <= math.fabs(1.05*l2.slope)):
		if(l1.start == l2.end or l1.start == l2.start):
			return l1.start
		elif(l1.end == l2.start or l1.end == l2.end):
		 	return l1.end
	else:
		return False

def checkSupplementary(l1, l2, l):
	strtLine = checkStraight(l1, l2)
	if(strtLine is False):
		# print("Cannot able to.")
		pass
	else:
		properLinesUp = [l1, l2]
		properLinesDown = [l1, l2]
		for line in l:
			# print(type(line))
			if(line.start == strtLine):
				if(line.end.y > (l1.slope*line.end.x + (strtLine.y - l1.slope*strtLine.x))):
					properLinesDown.append(line)
				elif(line.end.y < (l1.slope*line.end.x + (strtLine.y - l1.slope*strtLine.x))):
					properLinesUp.append(line)
			elif(line.end == strtLine):
				if(line.start.y > (l1.slope*line.start.x + (strtLine.y - l1.slope*strtLine.x))):
					properLinesDown.append(line)
				elif(line.start.y < (l1.slope*line.start.x + (strtLine.y - l1.slope*strtLine.x))):
					properLinesUp.append(line)
		properAnglesUp = []
		properAnglesDown = []
		for a in angles:
			if(a.lLine in properLinesUp and a.rLine in properLinesUp):
				properAnglesUp.append(a)
			elif(a.lLine in properLinesDown and a.rLine in properLinesDown):
				properAnglesDown.append(a)
		for ang in properAnglesUp:
			if(not ang.known):
				print(ang.id, ":", "Supplementary angles, ", [str(x) for x in properAnglesUp if not x == ang])
				ang.setValue(180 - (reduce(lambda x, y : x+y, [x.value for x in properAnglesUp if not x == ang])))
				print(ang.value)
		for ang in properAnglesDown:
			if(not ang.known):
				print(ang.id, ":", "Supplementary angles, ", [str(x) for x in properAnglesDown if not x == ang])
				ang.setValue(180 - (reduce(lambda x, y : x+y, [x.value for x in properAnglesDown if not x == ang])))
				print(ang.value)

def runCheckSup(lines):
	for l1 in lines:
		for l2 in lines:
			if(l1 is not l2):
				checkSupplementary(l1, l2, [x for x in lines if x is not l1 and x is not l2])

def findSomeAngles():
	for p in points:
		# print(p)
		linesOnThis = [l for l in lines if (l.start == p or l.end == p)]
		# for lx in linesOnThis:
		# 	print(lx, end=" ")
		# print()
		anglesToCheck = [a for a in angles if a.rLine in linesOnThis and a.lLine in linesOnThis]
		if(len(anglesToCheck) > 1):
			# print(p, "----------------")
			# for a in anglesToCheck:
			# 	print(a)
			# print("----------------")
			for ang in anglesToCheck:
				if(not ang.known):
					print(ang.id, ":", "Angles around a point, ", [str(x) for x in anglesToCheck if not x == ang])
					if(len([str(x) for x in anglesToCheck if not x == ang]) > 0):
						ang.setValue(360 - reduce(lambda x, y: x+y, [x.value for x in anglesToCheck if not x == ang]))
						print(ang.value)
					else:
						# print("Naat.")
						pass

with open("datafile.json") as file:
	allData = json.load(file)
	dataPoints = allData['points']
	dataLines = allData['lines']
	dataAngles = allData['angles']

	points = []
	lines = []
	angles = []
	triangles = []

	for p in dataPoints:
		points.append(Point(p['labe'], p['x'], p['y']))

	for l in dataLines:
		p = [x for x in points if x.label == l['start']['labe']][0]
		q = [x for x in points if x.label == l['end']['labe']][0]
		lines.append(Line(p.label+q.label, p, q))
	
	for a in dataAngles:
		l = [x for x in lines if x.label == a['leftline']['start']['labe']+a['leftline']['end']['labe']][0]
		r = [x for x in lines if x.label == a['rightline']['start']['labe']+a['rightline']['end']['labe']][0]
		id = l.label+r.label
		if(id[0] == id[2]):
			id = l.label[::-1]+r.label

		if(id[0] == id[3]):
			id = l.label[::-1]+r.label[::-1]

		if(id[1] == id[3]):
			id = l.label+r.label[::-1]

		id = id[0:2]+id[3]
		angles.append(Angle(id, int(a['value']), l, r))

findSomeAngles()
triangleFinder(lines)
matchToTheorem()

runCheckSup(lines)

