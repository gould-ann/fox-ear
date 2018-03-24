class Node:
    xPos = 0
    yPos = 0
    intensity = 0

    def __init__(self, x, y):
        self.xPos = x
        self.yPos = y

    def getX(self):
        return self.xPos
    
    def getY(self):
        return self.yPos

    def getInten(self):
        return self.intensity

    def setInten(self, inten):
        self.intensity = inten
