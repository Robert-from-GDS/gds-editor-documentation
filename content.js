//const GDS_page_locationRoot="https://robert-from-gds.github.io/gds-editor-documentation/";
const GDS_page_locationRoot="";
const GDS_DOCS_contents={
    name:"mainNavBar",
    structure:[
		{
		 type:"page",
		 id:"introduction",
		 name:"Introduction",
		 htmlContentRef:GDS_page_locationRoot+"pages/intro.html",
		},
		{
		 type:"page",
		 id:"gds-editor-minimum-requirements",
		 name:"Minimum system requirements",
		 htmlContentRef:GDS_page_locationRoot+"pages/minimum-requirements.html",
		},
		{
		 type:"page",
		 id:"known-issues",
		 name:"Known issues",
		 htmlContentRef:GDS_page_locationRoot+"pages/known-issues.html",
		},
		/*{
		 type:"page",
		 id:"quick-start",
		 name:"Quick start guide",
		 htmlContentRef:GDS_page_locationRoot+"pages/quick-start.html",
		},*/
		{
		 type:"page",
		 id:"mouse-controls",
		 name:"Mouse controls and selecting",
		 htmlContentRef:GDS_page_locationRoot+"pages/mouse-controls.html",
		},
		{
		 type:"page",
		 id:"hotkeys-and-shortcuts",
		 name:"hotkey look up",
		 htmlContentRef:GDS_page_locationRoot+"pages/hotkeys.html",
		},
		{
		 type:"page",
		 id:"gds-editor-layout",
		 name:"Gds Editor layout",
		 htmlContentRef:GDS_page_locationRoot+"pages/layout.html",
		},
		{
		 type:"category",
		 id:"the-gds-editor-scene",
		 name:"The GDS editor Scene",
		 contents:[
				 {type:"page" , name:"The GDS editor Scene", id:"scene-intro", htmlContentRef:GDS_page_locationRoot+"pages/scene-intro.html"}, //index page
				 {type:"page" , name:"Creating a new scene", id:"creating-new-scene", htmlContentRef:GDS_page_locationRoot+"pages/creating-new-scene.html"},
				 {type:"page" , name:"Loading a scene", id:"loading-a-scene", htmlContentRef:GDS_page_locationRoot+"pages/loading-a-scene.html"},
				 {type:"page" , name:"Saving a scene", id:"saving-a-scene", htmlContentRef:GDS_page_locationRoot+"pages/saving-a-scene.html"},
				 {type:"page" , name:"Adding components to your scene", id:"adding-components", htmlContentRef:GDS_page_locationRoot+"pages/adding-components.html"},
		         {type:"page" , name:"The Scene Palette", id:"scene-palette", htmlContentRef:GDS_page_locationRoot+"pages/scene-palette.html"},
				 {type:"page" , name:"Scene Categories", id:"scene-categories", htmlContentRef:GDS_page_locationRoot+"pages/scene-categories.html"},
				 {type:"page" , name:"Category operations", id:"category-options", htmlContentRef:GDS_page_locationRoot+"pages/category-operations.html"},
				 {type:"page" , name:"Scene settings", id:"scene-settings", htmlContentRef:GDS_page_locationRoot+"pages/scene-settings.html"},
				 {type:"page" , name:"The scene list", id:"the-scene-list", htmlContentRef:GDS_page_locationRoot+"pages/the_scene_list.html"},
				]
		},
		{
		 type:"category",
		 id:"gds-editor-components",
		 name:"Components",
		 contents:[
				 {type:"page" , name:"Component types", id:"components-intro", htmlContentRef:GDS_page_locationRoot+"pages/components-intro.html"}, //index page
		         {type:"page" , name:"GDS art object", id:"gds-art-objects", htmlContentRef:GDS_page_locationRoot+"pages/gds-art-object.html"},
				 {type:"page" , name:"Bitmap images", id:"bitmap-components", htmlContentRef:GDS_page_locationRoot+"pages/bitmap-components.html"},
				 {type:"page" , name:"Simple shapes", id:"shapes", htmlContentRef:GDS_page_locationRoot+"pages/shapes.html"},
				 {type:"page" , name:"Brush strokes", id:"brush-strokes", htmlContentRef:GDS_page_locationRoot+"pages/brush-strokes.html"},
				 {type:"page" , name:"Simple text", id:"simple-text", htmlContentRef:GDS_page_locationRoot+"pages/text-component.html"},
				 {type:"page" , name:"panels", id:"panel-based-components", htmlContentRef:GDS_page_locationRoot+"pages/panel-components.html"},
				 {type:"page" , name:"Texture backgrounds", id:"texture-backgrounds", htmlContentRef:GDS_page_locationRoot+"pages/texture-backgrounds.html"},
				 
				]
		},
		{
		 type:"category",
		 id:"TOOLS",
		 name:"Tools",
		 contents:[
				 {type:"page" , name:"Tools", id:"TOOLS", htmlContentRef:GDS_page_locationRoot+"pages/tools-intro.html"}, //index page
				 {type:"page" , name:"Select tool", id:"SELECTTOOL", htmlContentRef:GDS_page_locationRoot+"pages/select-tool.html"},
		         {type:"page" , name:"Brush", id:"BRUSH", htmlContentRef:GDS_page_locationRoot+"pages/brush-tool.html"},
				  {type:"page" , name:"Line tool", id:"LINETOOL", htmlContentRef:GDS_page_locationRoot+"pages/line-tool.html"},
				 {type:"page" , name:"Ruler", id:"RULER", htmlContentRef:GDS_page_locationRoot+"pages/ruler-tool.html"},
				 {type:"page" , name:"Export rectangle", id:"EXPORTRECT", htmlContentRef:GDS_page_locationRoot+"pages/export-rect.html"},
				  {type:"page" , name:"Shape select tool", id:"SHAPESELECT", htmlContentRef:GDS_page_locationRoot+"pages/shape-select-tool.html"},
				]
		},
		
		{
		 type:"category",
		 id:"SLICING",
		 name:"Component slicing",
		 contents:[
				 {type:"page" , name:"Slicing introduction", id:"slicing-introduction", htmlContentRef:GDS_page_locationRoot+"pages/slicing-intro.html"}, //index page
		         {type:"page" , name:"nine slicing and three slicing", id:"nine-and-three-slicing", htmlContentRef:GDS_page_locationRoot+"pages/nine-slicing-and-three-slicing.html"},
				 {type:"page" , name:"grid slicing", id:"grid-slicing", htmlContentRef:GDS_page_locationRoot+"pages/grid-slicing.html"},
				]
		},
		{
		 type:"page",
		 id:"gds-editor-settings",
		 name:"GDS editor settings",
		 htmlContentRef:GDS_page_locationRoot+"pages/gdse-settings.html",
		},
		{
		 type:"page",
		 id:"change-log",
		 name:"Version change log",
		 htmlContentRef:GDS_page_locationRoot+"pages/change-log.html",
		},
	]


};