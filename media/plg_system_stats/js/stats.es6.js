/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 * @since      3.5.0
 */

Joomla = window.Joomla || {};

((Joomla, document) => {
  'use strict';

  const data = {
    option: 'com_ajax',
    group: 'system',
    plugin: 'renderStatsMessage',
    format: 'raw',
  };

  const initStatsEvents = () => {
    const messageContainer = document.getElementById('system-message-container');
    const joomlaAlert = messageContainer.querySelector('.js-pstats-alert');
    const detailsContainer = messageContainer.querySelector('.js-pstats-data-details');

    // Show details about the information being sent
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('js-pstats-btn-details')) {
        event.preventDefault();
        detailsContainer.classList.toggle('d-none');
      }
    });

    // Always allow
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('js-pstats-btn-allow-always')) {
        event.preventDefault();

        // Remove message
        joomlaAlert.close();

        // Set data
        data.plugin = 'sendAlways';

        Joomla.getJson(data);
      }
    });

    // Allow once
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('js-pstats-btn-allow-once')) {
        event.preventDefault();

        // Remove message
        joomlaAlert.close();

        // Set data
        data.plugin = 'sendOnce';

        Joomla.getJson(data);
      }
    });

    // Never allow
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('js-pstats-btn-allow-never')) {
        event.preventDefault();

        // Remove message
        joomlaAlert.close();

        // Set data
        data.plugin = 'sendNever';

        Joomla.getJson(data);
      }
    });
  };

  const getJson = (options) => {
    const messageContainer = document.getElementById('system-message-container');
    Joomla.request({
      url: `index.php?option=${options.option}&group=${options.group}&plugin=${options.plugin}&format=${options.format}`,
      headers: {
        'Content-Type': 'application/json',
      },
      onSuccess: (response) => {
        try {
          const json = JSON.parse(response);
          if (json && json.html) {
            messageContainer.innerHTML = response.html;
            messageContainer.querySelector('.js-pstats-alert').style.display = 'block';

            Joomla.initStatsEvents();
          }
        } catch (e) {
          throw new Error(e);
        }
      },
      onError: (xhr) => {
        Joomla.renderMessages({
          error: [xhr.response],
        });
      },
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    data.plugin = 'sendStats';
    getJson(data);
  });
})(Joomla, document);
