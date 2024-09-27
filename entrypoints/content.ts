export default defineContentScript({
  matches: ['*://*.linkedin.com/*', 'https://www.linkedin.com/*'],
  main() {
    console.log('Hello Piyush');

    const addIconToMessageInput = (input: HTMLDivElement) => {
      const icon = document.createElement('img');
      icon.src = "https://i.ibb.co/f1HBZk1/ai.png";
      icon.style.cssText = `position: absolute; right: 10px; bottom: 5px; transform: translateY(-50%); display: none; width: 15px; height: 15px; cursor: pointer; z-index: 1000;`;
      icon.classList.add('message-input-icon');

      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      if (input.parentNode) {
        input.parentNode.insertBefore(wrapper, input);
      }
      wrapper.appendChild(input);
      wrapper.appendChild(icon);

      input.addEventListener('focus', () => {
        icon.style.display = 'block';
      });

      input.addEventListener('blur', () => {
        setTimeout(() => {
          if (document.activeElement && !document.activeElement.closest('.ai-modal')) {
            icon.style.display = 'none';
          }
        }, 100);
      });

      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal();
      });
    };

    const createModal = () => {
      const modal = document.createElement('div');
      modal.classList.add('ai-modal');
      modal.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 10000; display: none; width: 400px; max-height: 80vh; overflow-y: auto;`;

      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message-container');
      messageContainer.style.cssText = `margin-bottom: 10px;`;

      const inputArea = document.createElement('div');
      
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Your prompt';
      input.style.cssText = `width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;`;

      const generateButton = document.createElement('button');
      generateButton.innerHTML = 'Generate';
      generateButton.style.cssText = `padding: 10px 20px; background-color: #2563eb; font-weight: bold; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; float: right;`;

      inputArea.appendChild(input);
      inputArea.appendChild(generateButton);

      modal.appendChild(messageContainer);
      modal.appendChild(inputArea);

      generateButton.addEventListener('click', (e) => {
        e.stopPropagation();

        const userMessage = document.createElement('div');
        userMessage.textContent = input.value;
        userMessage.style.cssText = `background-color: #DFE1E7; padding: 10px; border-radius: 4px; margin-left: auto; max-width: 70%; word-wrap: break-word; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); display:block; color: gray;`;

        const responseMessage = document.createElement('div');
        const responseText = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
        responseMessage.textContent = responseText;
        responseMessage.style.cssText = `background-color: #DBEAFE; padding: 10px; border-radius: 4px; max-width: 70%; word-wrap: break-word; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); display:block; color: gray;`;

        messageContainer.appendChild(userMessage);
        messageContainer.appendChild(responseMessage);

        input.value = '';

        generateButton.remove();

const insertButton = document.createElement('button');
insertButton.innerHTML = '<img src="https://i.postimg.cc/rK21zqZY/arrow-down-1.png" style="width:15px;height:15px;margin-right:5px;">Insert';
insertButton.style.cssText = `padding: 10px; background-color: white; color: gray; border: 2px solid gray; border-radius: 4px; margin-top: 10px; margin-right: 10px; float: right; display: flex; align-items: center;`;


        const regenerateButton = document.createElement('button');
        regenerateButton.innerHTML = '<img src="https://i.postimg.cc/wt2fQ7Zv/rotate-cw.png" style="width:15px;height:15px;margin-right:5px;">Regenerate';
        regenerateButton.style.cssText = `padding: 10px;background-color:#2563eb;color:white;border:none;border-radius:4px;margin-top:10px;margin-left:10px; float:right; display:flex; align-items:center;`; 

        inputArea.appendChild(regenerateButton);
        inputArea.appendChild(insertButton);

        insertButton.addEventListener('click', () => {
          const linkedinInputField = document.querySelector('div.msg-form__contenteditable[role="textbox"][aria-label="Write a message…"]');
          if (linkedinInputField) {
            const newParagraph = document.createElement('p');
            newParagraph.innerHTML = responseText;
            linkedinInputField.appendChild(newParagraph);
            (linkedinInputField as HTMLElement).focus();
          }
          // @ts-ignore
          closeModal();
        });

        regenerateButton.addEventListener('click', () => {
          console.log("Regenerate functionality not implemented yet.");
        });
      });

      document.body.appendChild(modal);
      return modal;
    };

    let isModalOpen = false;

    const createOverlay = () => {
      const overlay = document.createElement('div');
      overlay.classList.add('modal-overlay');
      overlay.style.cssText = `position: fixed; top: 0; left: 0;width :100%; height :100%; background-color :rgba(0,0,0,0.5); z-index :9999 ; display:none ;`;
      
      document.body.appendChild(overlay);
      
      return overlay;
    };

    const openModal = () => {
      const modal = document.querySelector('.ai-modal') || createModal();
      const overlay = document.querySelector('.modal-overlay') || createOverlay();
      
      (modal as HTMLElement).style.display = 'block';
      (overlay as HTMLElement).style.display = 'block'; 
      
      isModalOpen = true;

      const closeModal = (e: MouseEvent) => {
        if (!modal.contains(e.target as Node) && isModalOpen) {
          (modal as HTMLElement).style.display = 'none';
          (overlay as HTMLElement).style.display = 'none'; 
          isModalOpen = false;
          document.removeEventListener('click', closeModal);
          
          setTimeout(() => {
            modal.innerHTML = '';
            createModal();
          }, 100);
        }
      };

      setTimeout(() => {
        document.addEventListener('click', closeModal);
      }, 0);
    };

    const enhanceMessageInput = () => {
      const messageInput = document.querySelector('div.msg-form__contenteditable[role="textbox"][aria-label="Write a message…"]');
      
      if (messageInput && messageInput.parentNode && !messageInput.parentNode.querySelector('.message-input-icon')) {
        addIconToMessageInput(messageInput as HTMLDivElement);
      }
    };

    enhanceMessageInput();

    const observer = new MutationObserver((mutations) => {
       mutations.forEach((mutation) => {
         if (mutation.type === 'childList') {
           enhanceMessageInput();
         }
       });
    });

    observer.observe(document.body, { childList:true, subtree:true });
  }
});
