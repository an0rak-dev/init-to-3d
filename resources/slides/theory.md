# Theory

_Wait, don't leave the room !_

===

# CPU vs GPU

_Two chips, two purposes_

===

## CPU (Central Processing Unit)

![](./resources/images/cpu.png)

Note:
* Few cores (8-18), lots of computing power
* Max N(cores) //, just sysint for threads
* Compute operations in sequence
* Used by game loop updates, networking....

===

## GPU (Graphic Processing Unit)

![](./resources/images/gpu.png)

Note:
* Lots of cores (> 1000), few computing power
* Compute operations in parallel
* Shaders, lightning, visual effects. 
* May be integrated or dedicated.

===

# Maths

_Yeah... I'm sorry_

===

## 3D means Vector

`$$ pos = \begin{bmatrix} X \\ Y \\ Z \\ W \end{bmatrix} $$` 

Note:
* Each point is in a 3d coords space
* Ussually : X -> horizontal, Y -> Vertical, Z -> Depth
* W for homgenous coords, useful for operations later (often == 1)

===

### 3D means Matrix

`$$ newPos = \begin{bmatrix} X_{11} & X_{12} & X_{13} \\ Y_{11} & Y_{12} & Y_{13} \\ Z_{11} & Z_{12} & Z_{13} \\ W_{11} & W_{12} & W_{13} \end{bmatrix} * \begin{bmatrix} X \\ Y \\ Z \\ W \end{bmatrix} = \begin{bmatrix} X' \\ Y' \\ Z' \\ W' \end{bmatrix} $$`

Note:
* Each operation (translate, rotate, scale) is a different 4x4 matrix
* Each operation can be combined in 1 matrix for complete movement
* movement * vector => new position vector

===

### Referential Matters

![](./resources/images/left_hand_right_hand.png)

Note:
* Coords depend of referential
* Axis may change completly between two systems
* Choose one and stick to it !