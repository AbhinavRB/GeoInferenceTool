from functools import reduce
import math
import json
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
		self.known = True
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

def checkStraight(l1, l2):
	# print(l1.slope, ", ", l2.slope)
	if(l1.slope == 0 and math.fabs(l2.slope) <= 0.05):
		print("First")
		if(l1.start == l2.end or l1.start == l2.start):
			return l1.start
		elif(l1.end == l2.start or l1.end == l2.end):
		 	return l1.end
	elif(l2.slope == 0 and math.fabs(l1.slope) <= 0.05):
		print("Second")
		if(l1.start == l2.end or l1.start == l2.start):
			return l1.start
		elif(l1.end == l2.start or l1.end == l2.end):
		 	return l1.end
	elif(math.fabs(l1.slope) >= math.fabs(0.9*l2.slope) and math.fabs(l1.slope) <= math.fabs(1.1*l2.slope)):
		print("Third")
		if(l1.start == l2.end or l1.start == l2.start):
			return l1.start
		elif(l1.end == l2.start or l1.end == l2.end):
		 	return l1.end
	else:
		return False

def checkSupplementary(l1, l2, l):
	strtLine = checkStraight(l1, l2)
	if(strtLine is False):
		print("Cannot able to.")
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

		pL = []
		for lx in properLinesUp:
			if lx not in pL:
				pL.append(lx)
		properLinesUp = pL

		pL = []
		for lx in properLinesDown:
			if lx not in pL:
				pL.append(lx)
		properLinesDown = pL

		for lx in properLinesUp:
			print(lx)
		print("-------")
		for lx in properLinesDown:
			print(lx)

		properAnglesUp = []
		properAnglesDown = []
		for a in angles:
			if(a.lLine in properLinesUp and a.rLine in properLinesUp):
				properAnglesUp.append(a)
			elif(a.lLine in properLinesDown and a.rLine in properLinesDown):
				properAnglesDown.append(a)

		for lx in properAnglesUp:
			print(lx, lx.known)
		print("-------")
		for lx in properAnglesDown:
			print(lx, lx.known)

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


# p1 = Point(2, 8)
# p2 = Point(5, 5)
# p3 = Point(9, 1)
# p4 = Point(4, 1)
# p5 = Point(8, 12)


# l1 = Line(p1, p2)
# l2 = Line(p2, p3)
# l3 = Line(p2, p4)
# l4 = Line(p2, p5)
# # l5 = Line(p2, Point(7, 5))

# angles = [Angle(1, 60, l1, l3), Angle(2, -1, l3, l2), Angle(3, -1, l2, l4), Angle(4, 70, l4, l1)]

with open("datafile.json") as file:
	allData = json.load(file)
	dataPoints = allData['points']
	dataLines = allData['lines']
	dataAngles = allData['angles']

	points = []
	lines = []
	angles = []

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


checkSupplementary(lines[3], lines[6], [lines[i] for i in range(len(lines)) if i is not 3 or i is not 6])

# runCheckSup(lines)