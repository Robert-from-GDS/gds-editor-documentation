
var locationRoot="";
const GDS_DOCS_contents={
    name:"mainNavBar",
    structure:[
		{
		 type:"page",
		 id:"INTRO",
		 name:"Introduction",
		 htmlContentRef:locationRoot+"pages/intro.html",
		},
		{
		 type:"page",
		 id:"MINREQ",
		 name:"Minimum system requirements",
		 htmlContentRef:locationRoot+"pages/minimum-requirements.html",
		},
		{
		 type:"page",
		 id:"KNOWNISSUES",
		 name:"Known issues",
		 htmlContentRef:locationRoot+"pages/known-issues.html",
		},
		{
		 type:"page",
		 id:"QUICKSTART",
		 name:"Quick start guide",
		 htmlContentRef:locationRoot+"pages/quick-start.html",
		},
		{
		 type:"page",
		 id:"MOUSECTRLS",
		 name:"Mouse controls and selecting",
		 htmlContentRef:locationRoot+"pages/mouse-controls.html",
		},
		{
		 type:"page",
		 id:"HOTKEYTABLE",
		 name:"hotkey look up",
		 htmlContentRef:locationRoot+"pages/hotkeys.html",
		},
		{
		 type:"page",
		 id:"Layout",
		 name:"Gds Editor layout",
		 htmlContentRef:locationRoot+"pages/layout.html",
		},
		{
		 type:"category",
		 id:"SCENE",
		 name:"The GDS editor Scene",
		 contents:[
				 {type:"page" , name:"The GDS editor Scene", id:"SCENINTRO", htmlContentRef:locationRoot+"pages/scene-intro.html"}, //index page
				 {type:"page" , name:"Creating a new scene", id:"CREATINGNEWSCENE", htmlContentRef:locationRoot+"pages/creating-new-scene.html"},
				 {type:"page" , name:"Navegating a new scene", id:"NAVEGATINGSCENE", htmlContentRef:locationRoot+"pages/navegating-scene.html"},
				 {type:"page" , name:"Adding components to your scene", id:"ADDINGCOMPONETS", htmlContentRef:locationRoot+"pages/adding-components.html"},
		         {type:"page" , name:"The Scene Palette", id:"SCENEPALETTE", htmlContentRef:locationRoot+"pages/scene-palette.html"},
				 {type:"page" , name:"Scene Categories", id:"SCENECATS", htmlContentRef:locationRoot+"pages/scene-categories.html"},
				 {type:"page" , name:"Category operations", id:"CATOPS", htmlContentRef:locationRoot+"pages/category-operations.html"},
				 {type:"page" , name:"Scene settings", id:"SCENESETTINGS", htmlContentRef:locationRoot+"pages/scene-settings.html"},
				 {type:"page" , name:"The scene list", id:"SCENELIST", htmlContentRef:locationRoot+"pages/the_scene_list.html"},
				]
		},
		{
		 type:"category",
		 id:"COMPONENTS",
		 name:"Components",
		 contents:[
				 {type:"page" , name:"Component types", id:"COMPOS", htmlContentRef:locationRoot+"pages/components-intro.html"}, //index page
		         {type:"page" , name:"GDS art object", id:"GDSAO", htmlContentRef:locationRoot+"pages/gds-art-object.html"},
				 {type:"page" , name:"Bitmap images", id:"BITMAPS", htmlContentRef:locationRoot+"pages/bitmap-components.html"},
				 {type:"page" , name:"Simple shapes", id:"SHAPES", htmlContentRef:locationRoot+"pages/shapes.html"},
				 {type:"page" , name:"Brush strokes", id:"BRUSESTROKES", htmlContentRef:locationRoot+"pages/brush-strokes.html"},
				 {type:"page" , name:"Simple text", id:"SIMPLETEXT", htmlContentRef:locationRoot+"pages/text-component.html"},
				 {type:"page" , name:"panels", id:"PANELS", htmlContentRef:locationRoot+"pages/panel-components.html"},
				 {type:"page" , name:"Texture backgrounds", id:"TEXTUREBG", htmlContentRef:locationRoot+"pages/texture-backgrounds.html"},
				 
				]
		},
		{
		 type:"category",
		 id:"TOOLS",
		 name:"Tools",
		 contents:[
				 {type:"page" , name:"Tools", id:"TOOLS", htmlContentRef:locationRoot+"pages/tools-intro.html"}, //index page
				 {type:"page" , name:"Select tool", id:"SELECTTOOL", htmlContentRef:locationRoot+"pages/select-tool.html"},
		         {type:"page" , name:"Brush", id:"BRUSH", htmlContentRef:locationRoot+"pages/brush-tool.html"},
				  {type:"page" , name:"Line tool", id:"LINETOOL", htmlContentRef:locationRoot+"pages/line-tool.html"},
				 {type:"page" , name:"Ruler", id:"RULER", htmlContentRef:locationRoot+"pages/ruler-tool.html"},
				 {type:"page" , name:"Export rectangle", id:"EXPORTRECT", htmlContentRef:locationRoot+"pages/export-rect.html"},
				  {type:"page" , name:"Shape select tool", id:"SHAPESELECT", htmlContentRef:locationRoot+"pages/shape-select-tool.html"},
				]
		},
		
		{
		 type:"category",
		 id:"SLICING",
		 name:"Component slicing",
		 contents:[
				 {type:"page" , name:"Slicing introduction", id:"", htmlContentRef:locationRoot+"pages/slicing-intro.html"}, //index page
		         {type:"page" , name:"nine slicing and three slicing", id:"9N3Sl", htmlContentRef:locationRoot+"pages/nine-slicing-and-three-slicing.html"},
				 {type:"page" , name:"grid slicing", id:"GRIDSLICING", htmlContentRef:locationRoot+"pages/grid-slicing.html"},
				]
		},
		{
		 type:"page",
		 id:"GDSSETTINGS",
		 name:"GDS editor settings",
		 htmlContentRef:locationRoot+"pages/gdse-settings.html",
		},
	]


}


var navBar;
var contentContainer;
var lastPageViewed=null;// stores an id of the last page looked at
var next=null;//holds link to next itemID
var previous=null;//holds link to previous item in list
var flatList=[];
var nextButton=null;
var previousButton=null;



//lets make a flat copy of document structure for easy navigation and searching
function flattenDocsStructure(){
	flatList.length=0;
	for(let i=0; i < GDS_DOCS_contents.structure.length; i++){
		var item=GDS_DOCS_contents.structure[i];
		if(item.type==="page"){
			flatList.push(item);
		}
		else if(item.type==="category"){
			flattenCategoryItems(item);
		}
	}
}
//loop through a category and find the page by ID can go n levels deep recursivly
function flattenCategoryItems(category){
	for(let i=0; i < category.contents.length; i++){
		var item=category.contents[i];
		if(item.type==="page"){
			flatList.push(item);
		}
		else if(item.type==="category"){
			flattenCategoryItems(item);
		}
	}
}
/*----------END FALETTING------------------*/






//Build the navigation bar and inject it into the page on the left side----------------------------------BUILD PAGE---------------||
function buildNavBar(){
	navBar=document.createElement("div");
	navBar.id="gdse_docs_navBar";
	navBar.addEventListener("click", function(e){receiveNaveBarClick(e);});
	//loop through nave bar and build according to page type
	for(let i=0; i < GDS_DOCS_contents.structure.length; i++){
		var item=GDS_DOCS_contents.structure[i];
		var html=null;
		if(item.type==="page"){
			html=buildPageLi(item);
			html.classList.add("GDSE_navbar_pageTitle","pointer", "navHover", "selectable");
		}
		else if(item.type==="category"){
			html=buildCategoryLi(item);
		}
		if (html) navBar.append(html);
	}
	
	return navBar;
}

// builds a nav bar meu item entry for a category
function buildCategoryLi(item){
	// build th ebox holder
	var catBox=document.createElement("div");
		catBox.classList.add("navBarCategoryHolder");
		catBox.id="CATBOX"+item.id;
	//build the header for th ebox
	var catHeader=document.createElement("div");
		catHeader.dataset.code=item.contents[0].id;
		catHeader.dataset.code=item.contents[0].id;
		catHeader.dataset.name=item.contents[0].name;
		catHeader.dataset.catCode=item.id;
		catHeader.dataset.type="CATHEADER";
		catHeader.dataset.contentRef=item.contents[0].htmlContentRef;
		catHeader.classList.add("GDSE_navbar_categoryHeader","pointer", "navHover", "selectable");
		catHeader.innerHTML=item.contents[0].name + " \u25BC";
		catBox.append(catHeader);
	//build the dop down a hidden div that opens when the catBox Header is clicked
	var catDD=document.createElement("div");
		catDD.classList.add("navBarCategoryDropDown");
		catDD.id="dropDown"+item.id;
		catDD.style.display="none";
		catBox.append(catDD);
		for (let i=1; i < item.contents.length; i++){
			let li=buildPageLi(item.contents[i]);
				li.classList.add("GDSE_navbar_categoryTitle", "pointer", "navHover", "selectable");
				catDD.append(li);
		}
		return catBox;
}

// builds a nav bar meu item entry for a page
function buildPageLi(item){
	var pageItem=document.createElement("div");
		pageItem.dataset.code=item.id;
		pageItem.dataset.name=item.name;
		pageItem.dataset.contentRef=item.htmlContentRef;
		pageItem.dataset.type="PAGETITLE";
		pageItem.innerHTML=item.name;
		return pageItem;
}

function buildNextAndPreviousButtons(){
	nextButton=document.createElement("div");
	nextButton.classList.add("nextButton","inline", "pointer", "navHover");
	nextButton.onclick=function(){docLink(this.dataset.code);};
	nextButton.id="nextButton";
	nextButton.innerHTML="next page";
	
	previousButton=document.createElement("div");
	previousButton.classList.add("previousButton" ,"inline", "pointer", "navHover");
	previousButton.onclick=function(){docLink(this.dataset.code);};
	previousButton.id="previousButton";
	previousButton.innerHTML="previous page";
}
















//when a user clicks anywhere in the navbar
function receiveNaveBarClick(e){
		console.log("received nav bar click");
		if(! e.target){return false;}
		if(! e.target.dataset){return false;}
		if(! e.target.dataset.contentRef){return false;}
		
		
		loadInContent(e.target.dataset.contentRef,e.target.dataset.code);
		//if there is a type set in the dataset that is a Category
		if(e.target.dataset.type){
			if(e.target.dataset.type==="CATHEADER"){
				catCode=e.target.dataset.catCode;
				toggleCategoryDropDown(catCode);
			}
			else{
			scrollToTop();
			}
		}
		
		//get the HTML file from the content ref and inject it into contentContainer
	}

function toggleCategoryDropDown(id){
	console.log("totolging"+id);
	let element=document.getElementById("dropDown"+id);
	if(element.style.display==="none"){
		element.style.display="block"
	}
	else if(element.style.display==="block"){
		element.style.display="none"
	}
}


function docLink(id){
	let doc=findDocById(id);
	if(doc){
		loadInContent(doc.htmlContentRef, doc.id);
	}
	else{
		console.error("document not found");
	}
}


//deep scans contents and returns the item object if true false if not
function findDocById(id){
	for(let i=0; i < flatList.length; i++){
		if(flatList[i].id===id){return flatList[i];}
	}
	return false;
}


function findIndexById(id){
	for(let i=0; i < flatList.length; i++){
		if(flatList[i].id===id){return i;}
	}
	return false;
}


function loadInContent(ref,id){
	const bust = Date.now(); // or a build version
	const url = ref + "?v=" + bust;

	fetch(url)
		  .then(response => {
			if (!response.ok) throw new Error("Failed to load content: " + ref);
			return response.text();
		  })
		  .then(html => {
			contentContainer.innerHTML = html;
			setPagination(id);
			setNavBarHighlight(id);
		  })
		  .catch(err => {
			contentContainer.innerHTML = `<div class="error">Error loading content: ${err.message}</div>`;
		  });
}



function setPagination(id){
	let i=findIndexById(id);
	let spacer=document.createElement("div");
		spacer.classList.add("paginationSpacer");
		contentContainer.append(spacer);
	if(i !==false){
		//in bounds for previous
		if (i > 0) {
		  previousButton.dataset.code = flatList[i - 1].id;
		  previousButton.innerHTML = "<b> \u25C0  previous </b> " + flatList[i - 1].name;
		  contentContainer.append(previousButton);
		}
		//in bounds for next
		if (i < flatList.length - 1) {
		  nextButton.dataset.code = flatList[i + 1].id;
		  nextButton.innerHTML = "<b> next \u25B6</b> " + flatList[i + 1].name;
		  contentContainer.append(nextButton);
		}
	}
}



function setNavBarHighlight(id) {
  const children = navBar.querySelectorAll('.selectable');

  for (let i = 0; i < children.length; i++) {
    if (children[i].dataset.code === id) {
      children[i].style.backgroundColor = "#79e1e1";
    } else {
      children[i].style.backgroundColor = "transparent";
    }
  }
}


function scrollToTop(){
	
	window.scrollTo({ top: 0, behavior: 'smooth' });

}













//Build the navigation bar and inject it into the page on the right side
function buildContentDisplay(){
	contentContainer=document.createElement("div");
	contentContainer.id="GDScontentContainer";
	return contentContainer;
}










function buildGDSEDocs(){
	let pageWrapper=document.getElementById("pageWrapper");
		pageWrapper.append(buildNavBar());
		pageWrapper.append(buildContentDisplay());
		loadInContent(GDS_DOCS_contents.structure[0].htmlContentRef, "INTRO");
		flattenDocsStructure();
		buildNextAndPreviousButtons();
}





