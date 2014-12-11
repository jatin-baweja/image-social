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
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    var $imageSearchForm = $('#flickr-search-form');
    $imageSearchForm.submit(function(e) {
      e.preventDefault();
      urlToHit = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + $('#text').val() + "&rsz=5"
      $.ajax({
        url: urlToHit,
        type: "GET",
        dataType: "json",
        success: function(data, xhr, response) {
          app.attachImages(data.responseData.results);
        },
        error: function(xhr, status, response) {
          alert("Error :" + status  + " " + response);
        }
      });
    });
  },
  attachImages: function(resultData) {
    var $imageList = $('#image-list');
    $imageList.html('');
    $.each(resultData, function(i,e) {
      $imageList.append("<div id='image-" + e.id + "'><img src='" + e.unescapedUrl + "' width='60px' height='40px' class='share-image'/></div>" );
    });
    this.handleImageClick();
  },
  handleImageClick: function() {
    $('.share-image').on("click", function(e) {
      var $target = $(e.target);
      window.plugins.socialsharing.share(null, null, $target.attr('src'), null);
    });
  }
};
