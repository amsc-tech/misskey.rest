import * as riot from 'riot';
import CONFIG from '../../common/scripts/config';
import dialog from './dialog';
import api from '../../common/scripts/api';

export default (I, cb, file = null) => {
	const fileSelected = file => {
		const cropper = riot.mount(document.body.appendChild(document.createElement('mk-crop-window')), {
			file: file,
			title: 'バナーとして表示する部分を選択',
			aspectRatio: 16 / 9
		})[0];

		cropper.on('cropped', blob => {
			const data = new FormData();
			data.append('i', I.token);
			data.append('file', blob, file.name + '.cropped.png');

			api(I, 'drive/folders/find', {
				name: 'バナー'
			}).then(iconFolder => {
				if (iconFolder.length === 0) {
					api(I, 'drive/folders/create', {
						name: 'バナー'
					}).then(iconFolder => {
						upload(data, iconFolder);
					});
				} else {
					upload(data, iconFolder[0]);
				}
			});
		});

		cropper.on('skipped', () => {
			set(file);
		});
	};

	const upload = (data, folder) => {
		const progress = riot.mount(document.body.appendChild(document.createElement('mk-progress-dialog')), {
			title: '新しいバナーをアップロードしています'
		})[0];

		if (folder) data.append('folder_id', folder.id);

		const xhr = new XMLHttpRequest();
		xhr.open('POST', CONFIG.apiUrl + '/drive/files/create', true);
		xhr.onload = e => {
			const file = JSON.parse(e.target.response);
			progress.close();
			set(file);
		};

		xhr.upload.onprogress = e => {
			if (e.lengthComputable) progress.updateProgress(e.loaded, e.total);
		};

		xhr.send(data);
	};

	const set = file => {
		api(I, 'i/update', {
			banner_id: file.id
		}).then(i => {
			dialog('<i class="fa fa-info-circle"></i>バナーを更新しました',
				'新しいバナーが反映されるまで時間がかかる場合があります。',
			[{
				text: 'わかりました。'
			}]);

			if (cb) cb(i);
		});
	};

	if (file) {
		fileSelected(file);
	} else {
		const browser = riot.mount(document.body.appendChild(document.createElement('mk-select-file-from-drive-window')), {
			multiple: false,
			title: '<i class="fa fa-picture-o"></i>バナーにする画像を選択'
		})[0];

		browser.one('selected', file => {
			fileSelected(file);
		});
	}
};
