<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div>
	<MkStickyContainer>
		<template #header><XHeader :tabs="headerTabs"/></template>
		<MkSpacer :contentMax="700" :marginMin="16" :marginMax="32">
			<FormSuspense :p="init">
				<div class="_gaps_m">
					<MkSwitch v-model="enableRegistration" @change="onChange_enableRegistration">
						<template #label>{{ i18n.ts.enableRegistration }}</template>
					</MkSwitch>

					<MkSwitch v-model="emailRequiredForSignup" @change="onChange_emailRequiredForSignup">
						<template #label>{{ i18n.ts.emailRequiredForSignup }}</template>
					</MkSwitch>

					<MkSwitch v-model="blockMentionsFromUnfamiliarRemoteUsers">
						<template #label>{{ i18n.ts.blockMentionsFromUnfamiliarRemoteUsers }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
						<template #caption>{{ i18n.ts.blockMentionsFromUnfamiliarRemoteUsersDescription }} Cherry-picked from Misskey.io (https://github.com/MisskeyIO/misskey/commit/82cc3987c13db4ad0da1589386027c222ce85ff8)</template>
					</MkSwitch>

					<MkSwitch v-if="enableRegistration" v-model="enableRegistrationLimit">
						<template #label>{{ i18n.ts.enableRegistrationLimit }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
						<template #caption>{{ i18n.ts.enableRegistrationLimitDescription }}</template>
					</MkSwitch>

					<MkInput v-if="enableRegistration && enableRegistrationLimit" v-model="registrationLimitCooldown" type="number" :min="1">
						<template #label>{{ i18n.ts.registrationLimitCooldown }}</template>
						<template #suffix>{{ i18n.ts._time.hour }}</template>
						<template #caption>{{ i18n.ts.registrationLimitCooldownDescription }}</template>
					</MkInput>

					<MkInput v-if="enableRegistration && enableRegistrationLimit" v-model="registrationLimit" type="number" :min="0">
						<template #label>{{ i18n.ts.registrationLimit }}</template>
						<template #caption>{{ i18n.ts.registrationLimitDescription }}</template>
					</MkInput>

					<MkSwitch v-model="disableExploreLocalUsers">
						<template #label>{{ i18n.ts.disableExploreLocalUsers }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
						<template #caption>{{ i18n.ts.disableExploreLocalUsersDescription }}</template>
					</MkSwitch>

					<MkSwitch v-model="disableEntranceFeatureTimeline">
						<template #label>{{ i18n.ts.disableEntranceFeatureTimeline }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
						<template #caption>{{ i18n.ts.disableEntranceFeatureTimelineDescription }}</template>
					</MkSwitch>

					<MkSwitch v-model="enableAgeRestriction">
						<template #label>{{ i18n.ts.enableAgeRestriction }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
					</MkSwitch>

					<MkInput v-if="enableAgeRestriction" v-model="ageRestrictionThreshold" type="number" :min="0">
						<template #label>{{ i18n.ts.ageRestrictionThreshold }}</template>
						<template #suffix>{{ i18n.tsx.yearsOld({ age: '' }) }}</template>
						<template #caption>{{ i18n.ts.ageRestrictionThresholdDescription }}</template>
					</MkInput>

					<MkSwitch v-model="blockMentionsFromUnfamiliarRemoteUsers">
						<template #label>{{ i18n.ts.blockMentionsFromUnfamiliarRemoteUsers }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
						<template #caption>{{ i18n.ts.blockMentionsFromUnfamiliarRemoteUsersDescription }} Cherry-picked from Misskey.io (https://github.com/MisskeyIO/misskey/commit/82cc3987c13db4ad0da1589386027c222ce85ff8)</template>
					</MkSwitch>

					<MkSwitch v-if="enableRegistration" v-model="enableRegistrationLimit">
						<template #label>{{ i18n.ts.enableRegistrationLimit }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
						<template #caption>{{ i18n.ts.enableRegistrationLimitDescription }}</template>
					</MkSwitch>

					<MkInput v-if="enableRegistration && enableRegistrationLimit" v-model="registrationLimitCooldown" type="number" :min="1">
						<template #label>{{ i18n.ts.registrationLimitCooldown }}</template>
						<template #suffix>{{ i18n.ts._time.hour }}</template>
						<template #caption>{{ i18n.ts.registrationLimitCooldownDescription }}</template>
					</MkInput>

					<MkInput v-if="enableRegistration && enableRegistrationLimit" v-model="registrationLimit" type="number" :min="0">
						<template #label>{{ i18n.ts.registrationLimit }}</template>
						<template #caption>{{ i18n.ts.registrationLimitDescription }}</template>
					</MkInput>

					<MkSwitch v-model="disableExploreLocalUsers">
						<template #label>{{ i18n.ts.disableExploreLocalUsers }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
						<template #caption>{{ i18n.ts.disableExploreLocalUsersDescription }}</template>
					</MkSwitch>

					<MkSwitch v-model="disableEntranceFeatureTimeline">
						<template #label>{{ i18n.ts.disableEntranceFeatureTimeline }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
						<template #caption>{{ i18n.ts.disableEntranceFeatureTimelineDescription }}</template>
					</MkSwitch>

					<MkSwitch v-model="enableAgeRestriction">
						<template #label>{{ i18n.ts.enableAgeRestriction }}<span class="_beta">{{ i18n.ts.originalFeature }}</span></template>
					</MkSwitch>

					<MkInput v-if="enableAgeRestriction" v-model="ageRestrictionThreshold" type="number" :min="0">
						<template #label>{{ i18n.ts.ageRestrictionThreshold }}</template>
						<template #suffix>{{ i18n.tsx.yearsOld({ age: '' }) }}</template>
						<template #caption>{{ i18n.ts.ageRestrictionThresholdDescription }}</template>
					</MkInput>

					<MkInput v-model="tosUrl" type="url">
						<template #prefix><i class="ti ti-link"></i></template>
						<template #label>{{ i18n.ts.tosUrl }}</template>
					</MkInput>

					<MkInput v-model="privacyPolicyUrl" type="url">
						<template #prefix><i class="ti ti-link"></i></template>
						<template #label>{{ i18n.ts.privacyPolicyUrl }}</template>
					</MkInput>

					<MkInput v-model="inquiryUrl" type="url">
						<template #prefix><i class="ti ti-link"></i></template>
						<template #label>{{ i18n.ts._serverSettings.inquiryUrl }}</template>
						<template #caption>{{ i18n.ts._serverSettings.inquiryUrlDescription }}</template>
					</MkInput>

					<FormLink to="/admin/server-rules">{{ i18n.ts.serverRules }}</FormLink>

					<MkFolder>
						<template #icon><i class="ti ti-lock-star"></i></template>
						<template #label>{{ i18n.ts.preservedUsernames }}</template>

						<div class="_gaps">
							<MkTextarea v-model="preservedUsernames">
								<template #caption>{{ i18n.ts.preservedUsernamesDescription }}</template>
							</MkTextarea>
							<MkButton primary @click="save_preservedUsernames">{{ i18n.ts.save }}</MkButton>
						</div>
					</MkFolder>

					<MkFolder>
						<template #icon><i class="ti ti-message-exclamation"></i></template>
						<template #label>{{ i18n.ts.sensitiveWords }}</template>

						<div class="_gaps">
							<MkTextarea v-model="sensitiveWords">
								<template #caption>{{ i18n.ts.sensitiveWordsDescription }}<br>{{ i18n.ts.sensitiveWordsDescription2 }}</template>
							</MkTextarea>
							<MkButton primary @click="save_sensitiveWords">{{ i18n.ts.save }}</MkButton>
						</div>
					</MkFolder>

					<MkFolder>
						<template #icon><i class="ti ti-message-x"></i></template>
						<template #label>{{ i18n.ts.prohibitedWords }}</template>

						<div class="_gaps">
							<MkTextarea v-model="prohibitedWords">
								<template #caption>{{ i18n.ts.prohibitedWordsDescription }}<br>{{ i18n.ts.prohibitedWordsDescription2 }}</template>
							</MkTextarea>
							<MkButton primary @click="save_prohibitedWords">{{ i18n.ts.save }}</MkButton>
						</div>
					</MkFolder>

					<MkFolder>
						<template #icon><i class="ti ti-eye-off"></i></template>
						<template #label>{{ i18n.ts.hiddenTags }}</template>

						<div class="_gaps">
							<MkTextarea v-model="hiddenTags">
								<template #caption>{{ i18n.ts.hiddenTagsDescription }}</template>
							</MkTextarea>
							<MkButton primary @click="save_hiddenTags">{{ i18n.ts.save }}</MkButton>
						</div>
					</MkFolder>

					<MkFolder>
						<template #icon><i class="ti ti-eye-off"></i></template>
						<template #label>{{ i18n.ts.silencedInstances }}</template>

						<div class="_gaps">
							<MkTextarea v-model="silencedHosts">
								<template #caption>{{ i18n.ts.silencedInstancesDescription }}</template>
							</MkTextarea>
							<MkButton primary @click="save_silencedHosts">{{ i18n.ts.save }}</MkButton>
						</div>
					</MkFolder>

					<MkFolder>
						<template #icon><i class="ti ti-eye-off"></i></template>
						<template #label>{{ i18n.ts.mediaSilencedInstances }}</template>

						<div class="_gaps">
							<MkTextarea v-model="mediaSilencedHosts">
								<template #caption>{{ i18n.ts.mediaSilencedInstancesDescription }}</template>
							</MkTextarea>
							<MkButton primary @click="save_mediaSilencedHosts">{{ i18n.ts.save }}</MkButton>
						</div>
					</MkFolder>

					<MkFolder>
						<template #icon><i class="ti ti-ban"></i></template>
						<template #label>{{ i18n.ts.blockedInstances }}</template>

						<div class="_gaps">
							<MkTextarea v-model="blockedHosts">
								<template #caption>{{ i18n.ts.blockedInstancesDescription }}</template>
							</MkTextarea>
							<MkButton primary @click="save_blockedHosts">{{ i18n.ts.save }}</MkButton>
						</div>
					</MkFolder>
				</div>
			</FormSuspense>
		</MkSpacer>
	</MkStickyContainer>
</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import XHeader from './_header_.vue';
import MkSwitch from '@/components/MkSwitch.vue';
import MkInput from '@/components/MkInput.vue';
import MkTextarea from '@/components/MkTextarea.vue';
import FormSuspense from '@/components/form/suspense.vue';
import * as os from '@/os.js';
import { misskeyApi } from '@/scripts/misskey-api.js';
import { fetchInstance } from '@/instance.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import MkButton from '@/components/MkButton.vue';
import FormLink from '@/components/form/link.vue';
import MkFolder from '@/components/MkFolder.vue';

const enableRegistration = ref(false);
const enableRegistrationLimit = ref(false);
const registrationLimit = ref(0);
const registrationLimitCooldown = ref(0);
const emailRequiredForSignup = ref(false);
const disableExploreLocalUsers = ref(false);
const disableEntranceFeatureTimeline = ref(false);
const enableAgeRestriction = ref(false);
const ageRestrictionThreshold = ref(0);
const sensitiveWords = ref('');
const preservedUsernames = ref('');
const prohibitedWords = ref('');
const hiddenTags = ref('');
const blockedHosts = ref<string>('');
const silencedHosts = ref<string>('');
const blockMentionsFromUnfamiliarRemoteUsers = ref(false);
const mediaSilencedHosts = ref<string>('');

async function init() {
	const meta = await misskeyApi('admin/meta');
	enableRegistration.value = !meta.disableRegistration;
	enableRegistrationLimit.value = meta.enableRegistrationLimit;
	registrationLimit.value = meta.registrationLimit;
	registrationLimitCooldown.value = meta.registrationLimitCooldown;
	emailRequiredForSignup.value = meta.emailRequiredForSignup;
	disableExploreLocalUsers.value = meta.disableExploreLocalUsers;
	disableEntranceFeatureTimeline.value = meta.disableEntranceFeatureTimeline;
	enableAgeRestriction.value = meta.enableAgeRestriction;
	ageRestrictionThreshold.value = meta.ageRestrictionThreshold;
	blockMentionsFromUnfamiliarRemoteUsers.value = meta.blockMentionsFromUnfamiliarRemoteUsers;
	sensitiveWords.value = meta.sensitiveWords.join('\n');
	prohibitedWords.value = meta.prohibitedWords.join('\n');
	hiddenTags.value = meta.hiddenTags.join('\n');
	preservedUsernames.value = meta.preservedUsernames.join('\n');
	blockedHosts.value = meta.blockedHosts.join('\n');
	silencedHosts.value = meta.silencedHosts.join('\n');
	mediaSilencedHosts.value = meta.mediaSilencedHosts.join('\n');
}

function onChange_enableRegistration(value: boolean) {
	os.apiWithDialog('admin/update-meta', {
		disableRegistration: !value,
	}).then(() => {
		fetchInstance(true);
	});
}

function onChange_emailRequiredForSignup(value: boolean) {
	os.apiWithDialog('admin/update-meta', {
		emailRequiredForSignup: value,
	}).then(() => {
		fetchInstance(true);
	});
}

function save_preservedUsernames() {
	os.apiWithDialog('admin/update-meta', {
		preservedUsernames: preservedUsernames.value.split('\n'),
	}).then(() => {
		fetchInstance(true);
	});
}

function save_sensitiveWords() {
	os.apiWithDialog('admin/update-meta', {
		disableRegistration: !enableRegistration.value,
		enableRegistrationLimit: enableRegistrationLimit.value,
		registrationLimit: registrationLimit.value,
		registrationLimitCooldown: registrationLimitCooldown.value,
		emailRequiredForSignup: emailRequiredForSignup.value,
		disableExploreLocalUsers: disableExploreLocalUsers.value,
		disableEntranceFeatureTimeline: disableEntranceFeatureTimeline.value,
		enableAgeRestriction: enableAgeRestriction.value,
		ageRestrictionThreshold: ageRestrictionThreshold.value,
		tosUrl: tosUrl.value,
		privacyPolicyUrl: privacyPolicyUrl.value,
		inquiryUrl: inquiryUrl.value,
		sensitiveWords: sensitiveWords.value.split('\n'),
	}).then(() => {
		fetchInstance(true);
	});
}

function save_prohibitedWords() {
	os.apiWithDialog('admin/update-meta', {
		prohibitedWords: prohibitedWords.value.split('\n'),
	}).then(() => {
		fetchInstance(true);
	});
}

function save_hiddenTags() {
	os.apiWithDialog('admin/update-meta', {
		hiddenTags: hiddenTags.value.split('\n'),
	}).then(() => {
		fetchInstance(true);
	});
}

function save_blockedHosts() {
	os.apiWithDialog('admin/update-meta', {
		blockedHosts: blockedHosts.value.split('\n') || [],
	}).then(() => {
		fetchInstance(true);
	});
}

function save_silencedHosts() {
	os.apiWithDialog('admin/update-meta', {
		silencedHosts: silencedHosts.value.split('\n') || [],
	}).then(() => {
		fetchInstance(true);
	});
}

function save_mediaSilencedHosts() {
	os.apiWithDialog('admin/update-meta', {
		mediaSilencedHosts: mediaSilencedHosts.value.split('\n') || [],
		blockMentionsFromUnfamiliarRemoteUsers: blockMentionsFromUnfamiliarRemoteUsers.value,
	}).then(() => {
		fetchInstance(true);
	});
}

const headerTabs = computed(() => []);

definePageMetadata(() => ({
	title: i18n.ts.moderation,
	icon: 'ti ti-shield',
}));
</script>
