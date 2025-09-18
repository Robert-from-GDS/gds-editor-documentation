var navBar;// html dom element - inject constructed list here- 
var contentContainer;// html dom element - inject fetched pages here
var lastPageViewed=null;// stores an id of the last page looked at
var next=null;//holds link to next itemID
var previous=null;//holds link to previous item in list
var flatList=[];// create a flat list for easy retreival and index determination
var nextButton=null; // html dom element 
var previousButton=null; // html dom element 

/*--Flattening-----------------------------------------------------------------||*/
//called on build after page load
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
/*------------END FALETTING------------------*/






//----------------------------------BUILD PAGE---------------||
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



function buildContentDisplay(){
	contentContainer=document.createElement("div");
	contentContainer.id="GDScontentContainer";
	return contentContainer;
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




//*-------------------------------------------------------------------------------INTERFACE INTERACTION---------------||
function receiveNaveBarClick(e){
		if(! e.target){return false;}
		if(! e.target.dataset){return false;}
		if(! e.target.dataset.contentRef){return false;}
		
		loadInContent(e.target.dataset.contentRef,e.target.dataset.code);
		//if this is a CATHEADER then we should expand the category and not scroll the page to the top
		if(e.target.dataset.type){
			if(e.target.dataset.type==="CATHEADER"){
				catCode=e.target.dataset.catCode;
				toggleCategoryDropDown(catCode);
			}
			else{
			scrollToTop();
			}
		}
	}
	
	
	
	

function toggleCategoryDropDown(id){
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
function buildGDSEDocs(){
	let pageWrapper=document.getElementById("pageWrapper");
		pageWrapper.append(buildNavBar());
		pageWrapper.append(buildContentDisplay());
		loadInContent(GDS_DOCS_contents.structure[0].htmlContentRef, "INTRO");
		flattenDocsStructure();
		buildNextAndPreviousButtons();
}






