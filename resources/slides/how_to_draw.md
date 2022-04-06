# Ok, now how we draw ?

_and build a world in 3D_

===

# 1. The Data

===

### The Object : Points

![](./resources/images/mesh.png)

Note:
* You can display Vertices using different topology
* Points

===

### The Object : Lines

![](./resources/images/mesh2.png)

Note:
* You can change the topology to connect group vertices by 2
* Lines

===

### The Object : Triangles

![](./resources/images/mesh3.png)

Note:
* You can change the topology to connect group vertices by 3
* Triangle

===

### The Object : Mesh

![](./resources/images/mesh4.png)

Note:
* When you group triangles between them
* Mesh !

===

### The Object : High Res 

![](./resources/images/mesh5.png)

Note:
* Subdivide for more precision/details
* More triangle -> more work to render

===

### The MVP : Model Matrix

![](./resources/images/mvp1.png)

Note:
* Mesh's vertices had static coords
* Move each vertices of a given 4x4 matrix to move the mesh in 3d World
* Change from mesh ref to world ref

===

### The MVP : View Matrix

![](./resources/images/mvp2.png)

Note:
* Now that we know mesh position in the world, need to know where it is
* Change from world ref to camera ref
* The camera DOESN'T move, it's the world which moves

===

### The MVP : Projection Matrix

![](./resources/images/mvp3.png)

Note:
* Now that we know mesh position from camera, we need to project it to screen
* Change from camera ref to clipspace ref
* Perspective


===

# 2. The Shader Program

Note:
* First thing to use : a shader program (shader)
* Little program ran by each core of the GPU
* Must be atomic ! //ism !
* Tells the GPU how to render pixels

===

![](./resources/images/shaders_example_1.jpg)

Note:
* Shaders are everywhere in VG

===

![](./resources/images/shaders_example_2.jpg)

Note:
* Effect shader used in VFX

===

![](./resources/images/shaders_example_3.jpg)

Note:
* Several shaders may be applied to the same image

===

![](./resources/images/shaders_example_4.jpg)

Note:
* May also be used by Environment artists (fog)

===

![](./resources/images/shaders_example_5.jpg)

Note:
* Even displaying the frame use a complete, basic, shader !

===


### Vertex Shader

![](./resources/images/vertex_source.png)

Note:
* First part of the shader program
* Defines the position of each pixel in the final frame
* Movement operations / Perspectives...
* You can code it

===

### Primitive generation & Rasterizer

![](./resources/images/rasterize.png)

Note:
* Calculated by the rendering engine
* Primitive generation : Use the topology setting to link the Vertices
* Rasterizer : Convert 3d object into a 2d image
* You can't code it, but settings available.

===

### Fragment Shader

![](./resources/images/fragment_source.png)

Note:
* Second part of the shader program
* Defines the color of each pixel in the final frame
* Use for color or lightning
* You can code it 
