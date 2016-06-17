/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function initialize ()
{
}

function checkYears ()
{
    var vItems = document.getElementsByName ('item');
    var nItems = 0;
    var vHTML;
    
    for (var i=0; i < vItems.length; i++)
    {
    	if (vItems[i].checked)
    	    nItems += 1;
    }
    vHTML = 'Continue with ' + nItems + ' Years item';
    if (   nItems == 0
        || nItems > 1)
        vHTML += 's';
    var vButton = document.getElementById ('ddimer');
    if (vButton)
        vButton.innerHTML = vHTML;
    var vDimer = document.getElementById ('measure');
    vDimer.style.height = '0px';
    vItems = document.getElementsByName ('dresult');
    for (var i=0; i < vItems.length; i++)
    	vItems[i].checked = false;
    document.getElementById ('show').style.display = 'none';
}

function getNrItems()
{
    var vItems = document.getElementsByName ('item');
    var nItems = 0;
    
    for (var i=0; i < vItems.length; i++)
    {
    	if (vItems[i].checked)
    	    nItems += 1;
    }
    return nItems;
}

function onClickDdimer ()
{
    var vLow   = document.getElementById ('lowLabel');
    var vHigh  = document.getElementById ('highLabel');
    var vItems;
    var nItems = 0;
    
    nItems = getNrItems ();
    if (nItems == 0)
    {
        vLow.innerHTML = 'HS D-dimer &lt; 1000ng/ml';
        vHigh.innerHTML = 'HS D-dimer &gt= 1000ng/ml';
    }
    else
    {
        vLow.innerHTML = 'HS D-dimer &lt; 500ng/ml';
        vHigh.innerHTML = 'HS D-dimer &gt= 500ng/ml';
    }
    var vHTML = nItems + ' Years item';
    if (   nItems == 0
        || nItems > 1)
        vHTML += 's';
    var vButton = document.getElementById ('ddimer');
    if (vButton)
        vButton.innerHTML = vHTML;
    var vDimer = document.getElementById ('measure');
    vDimer.style.height = 'auto';
    
    vItems = document.getElementsByName ('dresult');
    for (var i=0; i < vItems.length; i++)
    	vItems[i].checked = false;
    document.getElementById ('show').style.display = 'none';
}

function enableShow ()
{

    if (document.getElementById ('high').checked)
        document.getElementById ('show').style.display = 'block';
    else if (document.getElementById ('low').checked)
        document.getElementById ('show').style.display = 'block';
    else
        document.getElementById ('show').style.display = 'none';
}

function showResult ()
{
    var vResult = document.getElementById ('result');
    var vHTML = '<br />';
    var nItems;
    
    nItems = getNrItems ();
    vHTML += '<p>' + nItems + ' Years item';
    if (nItems != 1)
        vHTML += 's';
    vHTML += '</p>';
    if (nItems > 0)
        vHTML += '<ul>';
    if (document.getElementById ('signs').checked)
    	vHTML += '<li>Clinical signs of Deep Venous Trombosis</li>';
    if (document.getElementById ('hemo').checked)
    	vHTML += '<li>Hemoptysis</li>';
    if (document.getElementById ('alternative').checked)
    	vHTML += '<li>Alternative diagnosis less likely than PE</li>';
    if (nItems > 0)
        vHTML += '</ul>';

    vHTML += '<p>';
    if (document.getElementById ('high').checked)
    {
    	if (nItems == 0)
    	    vHTML += 'HS D-dimer &gt;= 1000ng/ml';
    	else
    	    vHTML += 'HS D-dimer &gt;= 500ng/ml';
        vHTML += '</p><p style="color:#f10202;">Conclusion: CTPA</p>';
    }
    else if (document.getElementById ('low').checked)
    {
    	if (nItems == 0)
    	    vHTML += 'HS D-dimer &lt; 1000ng/ml';
    	else
    	    vHTML += 'HS D-dimer &lt; 500ng/ml';
        vHTML += '</p><p style="color:#1ef102;">Conclusion: No Pulmonary Embolism</p>';
    }
    vResult.innerHTML = vHTML;
    fade ('result', true);
}

function onClickAccepteer ()
{
    fade ('opening', false);
}

//---------------------------------------------------------------------------
// fade een div in of uit. de transition property moet wel gezet zijn, anders
// gaat het niet gelijdelijk, maar "klaBAM"
//
function fade (szObject, bFadeIn)
{
    var vDiv = document.getElementById (szObject);	// Dit object dus
    if (!vDiv)
        return ;									// niet gevonden? Dan kunnen we niks
        
    if (bFadeIn)
    {
        vDiv.style.opacity = '1';					// we faden door de transparency op 0 of 1 te zetten
        vDiv.style.transform = 'scale(1)';			// en te schalen
        vDiv.style.webkitTransform = 'scale(1)';	// voor alle browsers
        vDiv.style.mozTransform = 'scale(1)';		// :)
    }
    else
    {
        vDiv.style.opacity = '0';
        vDiv.style.transform = 'scale(0)';
        vDiv.style.webkitTransform = 'scale(0)';
        vDiv.style.mozTransform = 'scale(0)';
    }
}

function redo()
{
    var vItems = document.getElementsByName ('item');
    var vDimer = document.getElementById ('measure');
    vDimer.style.height = '0px';
    
    for (var i=0; i < vItems.length; i++)
    	vItems[i].checked = false;
    vItems = document.getElementsByName ('dresult');
    for (var i=0; i < vItems.length; i++)
    	vItems[i].checked = false;
    document.getElementById ('show').style.display = 'none';
    document.getElementById ('ddimer').innerHTML = 'Continue with 0 Years items';
    fade ('result', false);
}
